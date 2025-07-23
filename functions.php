<?php
/**
 * Neve Child Theme Functions
 *
 * @package Neve Child
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Hide Jetpack DNS warnings in local development
if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
    error_reporting( E_ALL & ~E_WARNING );
}

/**
 * Enqueue parent and child theme styles and scripts
 */
function neve_child_enqueue_styles() {
    // Enqueue parent theme stylesheet
    wp_enqueue_style('neve-parent-style', get_template_directory_uri() . '/style.css');
    
    // Enqueue CSS variables first (before everything else)
    wp_enqueue_style('neve-child-variables',
        get_stylesheet_directory_uri() . '/assets/css/variables.css',
        array('neve-parent-style'),
        wp_get_theme()->get('Version')
    );
    
    // Enqueue child theme stylesheet with variables as dependency
    wp_enqueue_style('neve-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('neve-child-variables'),
        wp_get_theme()->get('Version')
    );
    
    // Enqueue MAC header JavaScript
    wp_enqueue_script('neve-child-mac-header',
        get_stylesheet_directory_uri() . '/components/mac-header/mac-header.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );
    
    // Enqueue MAC home banner JavaScript
    wp_enqueue_script('neve-child-mac-home-banner',
        get_stylesheet_directory_uri() . '/components/mac-home-banner/mac-home-banner.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );
    
    // Enqueue MAC header styles (with variables as dependency)
    wp_enqueue_style('neve-child-mac-header-style',
        get_stylesheet_directory_uri() . '/components/mac-header/style.css',
        array('neve-child-variables'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'neve_child_enqueue_styles');

/**
 * Enqueue editor styles for Gutenberg
 */
function neve_child_editor_styles() {
    // Add editor stylesheet
    add_theme_support('editor-styles');
    add_editor_style('editor-style.css');
}
add_action('after_setup_theme', 'neve_child_editor_styles');

/**
 * Custom function to add body classes for better styling control
 */
function neve_child_body_classes($classes) {
    $classes[] = 'neve-child-theme';
    return $classes;
}
add_filter('body_class', 'neve_child_body_classes');

/**
 * Example: Add custom excerpt length
 */
function neve_child_custom_excerpt_length($length) {
    return 25; // Number of words
}
add_filter('excerpt_length', 'neve_child_custom_excerpt_length');

/**
 * Register custom menu locations
 */
function neve_child_register_menus() {
    register_nav_menus(array(
        'header-menu' => __('Header Menu', 'neve-child'),
        'child-footer-menu' => __('Child Footer Menu', 'neve-child'),
    ));
}
add_action('init', 'neve_child_register_menus');

/**
 * Example: Add custom image sizes
 */
function neve_child_custom_image_sizes() {
    add_image_size('card-thumbnail', 300, 200, true);
    add_image_size('hero-banner', 1200, 600, true);
}
add_action('after_setup_theme', 'neve_child_custom_image_sizes');

/**
 * ========================================
 * MODULAR COMPONENTS SYSTEM
 * ========================================
 * Automatically loads and registers all custom components
 * from the components directory. No configuration needed.
 */

// Load the automatic component loader
require_once get_stylesheet_directory() . '/inc/blocks-loader.php';