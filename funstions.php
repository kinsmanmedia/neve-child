<?php
/**
 * Neve Child Theme functions
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue parent theme styles
add_action('wp_enqueue_scripts', 'neve_child_enqueue_styles');
function neve_child_enqueue_styles() {
    // Get parent theme
    $parent_style = 'neve-style';
    
    // Enqueue parent theme stylesheet
    wp_enqueue_style($parent_style, get_template_directory_uri() . '/style.css');
    
    // Enqueue child theme stylesheet
    wp_enqueue_style('neve-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array($parent_style),
        wp_get_theme()->get('Version')
    );
}

// Dynamic component discovery and inclusion
function discover_and_include_components() {
    $components_dir = get_stylesheet_directory() . '/src/components';
    
    if (!is_dir($components_dir)) {
        return [];
    }
    
    $components = [];
    $component_dirs = glob($components_dir . '/*', GLOB_ONLYDIR);
    
    foreach ($component_dirs as $dir) {
        $component_name = basename($dir);
        $component_file = $dir . '/component.php';
        
        if (file_exists($component_file)) {
            require_once $component_file;
            $components[] = $component_name;
        }
    }
    
    return $components;
}

// Store available components globally
$GLOBALS['theme_components'] = discover_and_include_components();

// Dynamic component asset loading
add_action('wp_enqueue_scripts', 'load_component_assets');
function load_component_assets() {
    $is_dev = defined('WP_DEBUG') && WP_DEBUG;
    $components_dir = get_stylesheet_directory() . '/src/components';
    
    if (!is_dir($components_dir)) {
        return;
    }
    
    $component_dirs = glob($components_dir . '/*', GLOB_ONLYDIR);
    
    foreach ($component_dirs as $dir) {
        $component_name = basename($dir);
        $script_file = $dir . '/script.js';
        
        // Only load if script.js exists
        if (file_exists($script_file)) {
            if ($is_dev) {
                // Development mode - load from Vite dev server
                wp_enqueue_script(
                    "component-{$component_name}",
                    "http://localhost:3000/src/components/{$component_name}/script.js",
                    [],
                    null,
                    true
                );
            } else {
                // Production mode - load from manifest
                $manifest_path = get_stylesheet_directory() . '/assets/.vite/manifest.json';
                
                if (file_exists($manifest_path)) {
                    $manifest = json_decode(file_get_contents($manifest_path), true);
                    $manifest_key = "src/components/{$component_name}/script.js";
                    
                    if (isset($manifest[$manifest_key])) {
                        wp_enqueue_script(
                            "component-{$component_name}",
                            get_stylesheet_directory_uri() . '/assets/' . $manifest[$manifest_key]['file'],
                            [],
                            '1.0.0',
                            true
                        );
                    }
                }
            }
        }
    }
}

// Main Vite asset loading
add_action('wp_enqueue_scripts', 'load_vite_assets');
function load_vite_assets() {
    $is_dev = defined('WP_DEBUG') && WP_DEBUG;
    
    if ($is_dev) {
        wp_enqueue_script('vite-client', 'http://localhost:3000/@vite/client', [], null);
        wp_enqueue_script('vite-main', 'http://localhost:3000/src/js/main.js', [], null, true);
        wp_enqueue_style('vite-main-css', 'http://localhost:3000/src/scss/main.scss', [], null);
    } else {
        $manifest_path = get_stylesheet_directory() . '/assets/.vite/manifest.json';
        
        if (file_exists($manifest_path)) {
            $manifest = json_decode(file_get_contents($manifest_path), true);
            
            if (isset($manifest['src/js/main.js'])) {
                wp_enqueue_script(
                    'neve-child-js',
                    get_stylesheet_directory_uri() . '/assets/' . $manifest['src/js/main.js']['file'],
                    [],
                    '1.0.0',
                    true
                );
            }
            
            if (isset($manifest['src/scss/main.scss'])) {
                wp_enqueue_style(
                    'neve-child-css',
                    get_stylesheet_directory_uri() . '/assets/' . $manifest['src/scss/main.scss']['file'],
                    [],
                    '1.0.0'
                );
            }
        }
    }
}

// Generic component renderer
function render_component($component_name, $args = []) {
    // Check if component exists
    if (!in_array($component_name, $GLOBALS['theme_components'])) {
        if (WP_DEBUG) {
            echo "<!-- Component '{$component_name}' not found -->";
        }
        return false;
    }
    
    // Try to call the component's render function
    $function_name = "render_{$component_name}_component";
    if (function_exists($function_name)) {
        call_user_func($function_name, $args);
        return true;
    }
    
    if (WP_DEBUG) {
        echo "<!-- Component '{$component_name}' found but render function missing -->";
    }
    return false;
}

// Helper function to get all available components
function get_available_components() {
    return $GLOBALS['theme_components'] ?? [];
}

// Helper function to check if a component exists
function component_exists($component_name) {
    return in_array($component_name, $GLOBALS['theme_components'] ?? []);
}

// Add module type for Vite scripts
add_filter('script_loader_tag', 'add_module_to_vite_script', 10, 3);
function add_module_to_vite_script($tag, $handle, $src) {
    if (strpos($src, 'localhost:3000') !== false) {
        return str_replace('<script ', '<script type="module" ', $tag);
    }
    return $tag;
}

// Debug function to list all components (only in debug mode)
if (WP_DEBUG) {
    add_action('wp_footer', 'debug_list_components');
    function debug_list_components() {
        $components = get_available_components();
        if (!empty($components)) {
            echo "<!-- Available Components: " . implode(', ', $components) . " -->";
        }
    }
}