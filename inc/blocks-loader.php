<?php
/**
 * Automatic Block Loader
 * Dynamically discovers and registers blocks from the blocks directory
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Neve_Child_Blocks_Loader {
    
    private $blocks_dir;
    private $blocks_url;
    
    public function __construct() {
        $this->blocks_dir = get_stylesheet_directory() . '/blocks/';
        $this->blocks_url = get_stylesheet_directory_uri() . '/blocks/';
        
        add_action('init', array($this, 'register_blocks'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_block_assets'));
    }
    
    /**
     * Automatically discover and register all blocks
     */
    public function register_blocks() {
        if (!file_exists($this->blocks_dir)) {
            return;
        }
        
        $block_folders = glob($this->blocks_dir . '*', GLOB_ONLYDIR);
        
        foreach ($block_folders as $block_folder) {
            $block_name = basename($block_folder);
            $this->register_single_block($block_name, $block_folder);
        }
    }
    
    /**
     * Register a single block
     */
    private function register_single_block($block_name, $block_folder) {
        $block_json = $block_folder . '/block.json';
        $render_file = $block_folder . '/render.php';
        $js_file = $block_folder . '/' . $block_name . '-block.js';
        $style_file = $block_folder . '/style.css';
        
        // Check if block.json exists
        if (!file_exists($block_json)) {
            return;
        }
        
        // Load block configuration
        $block_config = json_decode(file_get_contents($block_json), true);
        if (!$block_config) {
            return;
        }
        
        // Register block styles
        if (file_exists($style_file)) {
            wp_register_style(
                'neve-child-' . $block_name . '-block',
                $this->blocks_url . $block_name . '/style.css',
                array(),
                filemtime($style_file)
            );
        }
        
        // Register block editor script
        if (file_exists($js_file)) {
            wp_register_script(
                'neve-child-' . $block_name . '-block-editor',
                $this->blocks_url . $block_name . '/' . $block_name . '-block.js',
                array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
                filemtime($js_file)
            );
        }
        
        // Set up render callback
        $render_callback = null;
        if (file_exists($render_file)) {
            require_once $render_file;
            $render_function = 'neve_child_render_' . str_replace('-', '_', $block_name) . '_block';
            if (function_exists($render_function)) {
                $render_callback = $render_function;
            }
        }
        
        // Prepare block registration args
        $block_args = array();
        
        // Add editor script if exists
        if (file_exists($js_file)) {
            $block_args['editor_script'] = 'neve-child-' . $block_name . '-block-editor';
        }
        
        // Add style if exists
        if (file_exists($style_file)) {
            $block_args['style'] = 'neve-child-' . $block_name . '-block';
        }
        
        // Add render callback
        if ($render_callback) {
            $block_args['render_callback'] = $render_callback;
        }
        
        // Add attributes from block.json
        if (isset($block_config['attributes'])) {
            $block_args['attributes'] = $block_config['attributes'];
        }
        
        // Register the block
        register_block_type($block_config['name'], $block_args);
    }
    
    /**
     * Get all registered blocks
     */
    public function get_registered_blocks() {
        $blocks = array();
        
        if (!file_exists($this->blocks_dir)) {
            return $blocks;
        }
        
        $block_folders = glob($this->blocks_dir . '*', GLOB_ONLYDIR);
        
        foreach ($block_folders as $block_folder) {
            $block_name = basename($block_folder);
            $block_json = $block_folder . '/block.json';
            
            if (file_exists($block_json)) {
                $block_config = json_decode(file_get_contents($block_json), true);
                if ($block_config) {
                    $blocks[$block_name] = $block_config;
                }
            }
        }
        
        return $blocks;
    }
    
    /**
     * Enqueue additional block assets (like header-height.js for banner block)
     */
    public function enqueue_block_assets() {
        // Check if banner block exists and enqueue its header height script
        $banner_js = $this->blocks_dir . 'banner/header-height.js';
        if (file_exists($banner_js)) {
            wp_enqueue_script(
                'neve-child-banner-header-height',
                $this->blocks_url . 'banner/header-height.js',
                array(),
                filemtime($banner_js),
                true
            );
        }
        
        // Check if carousel block exists and enqueue its carousel script
        $carousel_js = $this->blocks_dir . 'carousel/carousel.js';
        if (file_exists($carousel_js)) {
            wp_enqueue_script(
                'neve-child-carousel-functionality',
                $this->blocks_url . 'carousel/carousel.js',
                array(),
                filemtime($carousel_js),
                true
            );
        }
    }
}

// Initialize the block loader
new Neve_Child_Blocks_Loader();