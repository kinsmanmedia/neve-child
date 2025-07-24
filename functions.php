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
    
    // Enqueue shared carousel controls CSS
    wp_enqueue_style('neve-child-carousel-controls',
        get_stylesheet_directory_uri() . '/assets/css/components/carousel-controls.css',
        array('neve-child-variables'),
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
    
    // Enqueue MAC home banner cards CSS
    wp_enqueue_style('neve-child-mac-home-banner-cards',
        get_stylesheet_directory_uri() . '/components/mac-home-banner/cards/cards.css',
        array('neve-child-variables'),
        wp_get_theme()->get('Version')
    );
    
    // Enqueue MAC home banner cards JavaScript
    wp_enqueue_script('neve-child-mac-home-banner-cards',
        get_stylesheet_directory_uri() . '/components/mac-home-banner/cards/cards.js',
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
    
    // Enqueue MAC footer styles and scripts
    wp_enqueue_style('neve-child-mac-footer-style',
        get_stylesheet_directory_uri() . '/components/mac-footer/style.css',
        array('neve-child-variables'),
        wp_get_theme()->get('Version')
    );
    
    wp_enqueue_script('neve-child-mac-footer',
        get_stylesheet_directory_uri() . '/components/mac-footer/mac-footer.js',
        array(),
        wp_get_theme()->get('Version'),
        true
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

/**
 * ========================================
 * CUSTOMIZER SETTINGS FOR MAC FOOTER
 * ========================================
 * Adds customizer options for footer content
 */

function neve_child_customize_register($wp_customize) {
    // Add MAC Footer Section
    $wp_customize->add_section('mac_footer_settings', array(
        'title'    => __('MAC Footer Settings', 'neve-child'),
        'priority' => 120,
    ));

    // Social Media Settings
    $social_platforms = array(
        'facebook' => 'Facebook URL',
        'twitter' => 'Twitter URL',
        'instagram' => 'Instagram URL',
        'youtube' => 'YouTube URL',
    );

    foreach ($social_platforms as $platform => $label) {
        $wp_customize->add_setting('mac_social_' . $platform, array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ));

        $wp_customize->add_control('mac_social_' . $platform, array(
            'label'    => __($label, 'neve-child'),
            'section'  => 'mac_footer_settings',
            'type'     => 'url',
        ));
    }

    // Contact Information
    $contact_fields = array(
        'address' => array('Contact Address', 'textarea'),
        'phone' => array('Phone Number', 'text'),
        'email' => array('Email Address', 'email'),
    );

    foreach ($contact_fields as $field => $config) {
        $wp_customize->add_setting('mac_contact_' . $field, array(
            'default'           => '',
            'sanitize_callback' => $config[1] === 'email' ? 'sanitize_email' : 'sanitize_text_field',
        ));

        $wp_customize->add_control('mac_contact_' . $field, array(
            'label'    => __($config[0], 'neve-child'),
            'section'  => 'mac_footer_settings',
            'type'     => $config[1],
        ));
    }
}
add_action('customize_register', 'neve_child_customize_register');