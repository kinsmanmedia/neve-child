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
 * Enqueue parent and child theme styles
 */
function neve_child_enqueue_styles() {
    // Enqueue parent theme stylesheet
    wp_enqueue_style('neve-parent-style', get_template_directory_uri() . '/style.css');
    
    // Enqueue child theme stylesheet with parent as dependency
    wp_enqueue_style('neve-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('neve-parent-style'),
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
 * Example: Register custom menu location
 */
function neve_child_register_menus() {
    register_nav_menus(array(
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
 * MODULAR BLOCKS SYSTEM
 * ========================================
 * Automatically loads and registers all custom blocks
 * from the blocks directory. No configuration needed.
 */

// Load the automatic block loader
require_once get_stylesheet_directory() . '/inc/blocks-loader.php';