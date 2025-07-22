<?php
/**
 * Automatic Component Loader
 * Dynamically discovers and registers components from the components directory
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Neve_Child_Components_Loader {
    
    private $components_dir;
    private $components_url;
    
    public function __construct() {
        $this->components_dir = get_stylesheet_directory() . '/components/';
        $this->components_url = get_stylesheet_directory_uri() . '/components/';
        
        add_action('init', array($this, 'register_components'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_component_assets'));
    }
    
    /**
     * Automatically discover and register all components
     */
    public function register_components() {
        if (!file_exists($this->components_dir)) {
            return;
        }
        
        $component_folders = glob($this->components_dir . '*', GLOB_ONLYDIR);
        
        foreach ($component_folders as $component_folder) {
            $component_name = basename($component_folder);
            $this->register_single_component($component_name, $component_folder);
        }
    }
    
    /**
     * Register a single component
     */
    private function register_single_component($component_name, $component_folder) {
        $component_json = $component_folder . '/block.json';
        $render_file = $component_folder . '/render.php';
        $js_file = $component_folder . '/' . $component_name . '.js';
        $style_file = $component_folder . '/style.css';
        
        // Check if block.json exists
        if (!file_exists($component_json)) {
            return;
        }
        
        // Load component configuration
        $component_config = json_decode(file_get_contents($component_json), true);
        if (!$component_config) {
            return;
        }
        
        // Register component styles (with variables as dependency)
        if (file_exists($style_file)) {
            wp_register_style(
                'neve-child-' . $component_name . '-component',
                $this->components_url . $component_name . '/style.css',
                array('neve-child-variables'),
                filemtime($style_file)
            );
        }
        
        // Register component editor script
        if (file_exists($js_file)) {
            wp_register_script(
                'neve-child-' . $component_name . '-component-editor',
                $this->components_url . $component_name . '/' . $component_name . '.js',
                array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
                filemtime($js_file)
            );
        }
        
        // Set up render callback
        $render_callback = null;
        if (file_exists($render_file)) {
            require_once $render_file;
            $render_function = 'neve_child_render_' . str_replace('-', '_', $component_name) . '_block';
            if (function_exists($render_function)) {
                $render_callback = $render_function;
            }
        }
        
        // Prepare component registration args
        $component_args = array();
        
        // Add editor script if exists
        if (file_exists($js_file)) {
            $component_args['editor_script'] = 'neve-child-' . $component_name . '-component-editor';
        }
        
        // Add style if exists
        if (file_exists($style_file)) {
            $component_args['style'] = 'neve-child-' . $component_name . '-component';
        }
        
        // Add render callback
        if ($render_callback) {
            $component_args['render_callback'] = $render_callback;
        }
        
        // Add attributes from block.json
        if (isset($component_config['attributes'])) {
            $component_args['attributes'] = $component_config['attributes'];
        }
        
        // Register the component
        register_block_type($component_config['name'], $component_args);
    }
    
    /**
     * Get all registered components
     */
    public function get_registered_components() {
        $components = array();
        
        if (!file_exists($this->components_dir)) {
            return $components;
        }
        
        $component_folders = glob($this->components_dir . '*', GLOB_ONLYDIR);
        
        foreach ($component_folders as $component_folder) {
            $component_name = basename($component_folder);
            $component_json = $component_folder . '/block.json';
            
            if (file_exists($component_json)) {
                $component_config = json_decode(file_get_contents($component_json), true);
                if ($component_config) {
                    $components[$component_name] = $component_config;
                }
            }
        }
        
        return $components;
    }
    
    /**
     * Enqueue additional component assets (like header-height.js for mac-banner component)
     */
    public function enqueue_component_assets() {
        // Check if mac-banner component exists and enqueue its header height script
        $mac_banner_js = $this->components_dir . 'mac-banner/header-height.js';
        if (file_exists($mac_banner_js)) {
            wp_enqueue_script(
                'neve-child-mac-banner-header-height',
                $this->components_url . 'mac-banner/header-height.js',
                array(),
                filemtime($mac_banner_js),
                true
            );
        }
    }
}

// Initialize the component loader
new Neve_Child_Components_Loader();