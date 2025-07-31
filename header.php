<?php
/**
 * MAC Header Component Template
 * Template part for the Mississauga Arts Council header
 *
 * @package Neve Child
 * @since   1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Default arguments
$defaults = [
    'logo_text' => get_bloginfo('name'),
    'logo_url' => home_url('/'),
    'show_search' => true,
    'menu_location' => 'primary',
    'sticky' => true,
    'cta_text' => __('JOIN NOW', 'neve'),
    'cta_url' => '/mac-membership'
];

// Get the custom logo
$custom_logo_id = get_theme_mod('custom_logo');
$logo_url = $custom_logo_id ? wp_get_attachment_image_url($custom_logo_id, 'full') : '';

/**
 * Filters the header classes.
 *
 * @param string $header_classes Header classes.
 *
 * @since 2.3.7
 */
$header_classes = apply_filters('nv_header_classes', 'header mac-header');

// Add sticky class if enabled
if ($defaults['sticky']) {
    $header_classes .= ' sticky-header';
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class('mac'); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site mac">
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'neve'); ?></a>

    <header class="<?php echo esc_attr($header_classes); ?>" 
            <?php echo (function_exists('neve_is_amp') && neve_is_amp()) ? 'next-page-hide' : ''; ?>
            role="banner">
        
        <!-- Skip link for accessibility -->
        <a class="neve-skip-link show-on-focus" href="#content">
            <?php echo esc_html__('Skip to content', 'neve'); ?>
        </a>
        
        <!-- Custom Header Content for Mississauga Arts Council -->
        <div class="mac-header-container">
            <div class="header-top">
                <div class="site-branding">
                    <a href="<?php echo esc_url($defaults['logo_url']); ?>" 
                       rel="home" 
                       class="custom-logo-link"
                       aria-label="<?php echo esc_attr(get_bloginfo('name') . ' - ' . __('Home', 'neve')); ?>">
                        <?php if ($logo_url) : ?>
                            <img src="<?php echo esc_url($logo_url); ?>" class="custom-logo" alt="<?php echo esc_attr(get_bloginfo('name')); ?>" />
                        <?php else : ?>
                            <span class="site-title"><?php echo esc_html($defaults['logo_text']); ?></span>
                        <?php endif; ?>
                    </a>
                    
                    <?php 
                    $tagline = get_bloginfo('description');
                    if ($tagline) : ?>
                        <p class="site-description screen-reader-text"><?php echo esc_html($tagline); ?></p>
                    <?php endif; ?>
                </div>

                <div class="header-actions">
                    <!-- Desktop CTA Button -->
                    <div class="header-cta-button desktop-only">
                        <a href="<?php echo esc_url($defaults['cta_url']); ?>" 
                           class="btn btn-prm"
                           aria-label="<?php echo esc_attr($defaults['cta_text'] . ' - ' . __('Opens membership page', 'neve')); ?>">
                            <?php echo esc_html($defaults['cta_text']); ?>
                        </a>
                    </div>
                    
                    <?php if (has_nav_menu('header-menu')) : ?>
                        <nav class="header-navigation" 
                             role="navigation" 
                             aria-label="<?php esc_attr_e('Header menu', 'neve'); ?>">
                            <?php
                            wp_nav_menu(array(
                                'theme_location' => 'header-menu',
                                'menu_class'     => 'header-menu',
                                'container'      => false,
                                'depth'          => 2,
                                'fallback_cb'    => false,
                            ));
                            ?>
                        </nav>
                    <?php endif; ?>
                    
                    <!-- Mobile hamburger menu button -->
                    <button class="menu-toggle mobile-only" 
                            type="button"
                            aria-controls="primary-menu" 
                            aria-label="<?php esc_attr_e('Toggle mobile menu', 'neve'); ?>" 
                            aria-expanded="false">
                        <span class="hamburger-icon">
                            <span class="line"></span>
                            <span class="line"></span>
                            <span class="line"></span>
                        </span>
                        <span class="screen-reader-text"><?php esc_html_e('Menu', 'neve'); ?></span>
                    </button>
                </div>
            </div>

            <!-- Mobile menu backdrop -->
            <div class="mobile-menu-backdrop"></div>
            
            <?php if (has_nav_menu('primary')) : ?>
                <nav class="main-navigation" 
                     role="navigation" 
                     aria-label="<?php esc_attr_e('Primary menu', 'neve'); ?>">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'menu_class'     => 'primary-menu',
                        'container'      => false,
                        'depth'          => 3,
                        'fallback_cb'    => '__return_false',
                    ));
                    ?>
                    
                    <!-- Mobile CTA Button -->
                    <div class="mobile-cta-button mobile-only">
                        <a href="<?php echo esc_url($defaults['cta_url']); ?>" 
                           class="btn btn-red"
                           aria-label="<?php echo esc_attr($defaults['cta_text'] . ' - ' . __('Opens membership page', 'neve')); ?>">
                            <?php echo esc_html($defaults['cta_text']); ?>
                        </a>
                    </div>
                </nav>
            <?php endif; ?>
        </div>

        <?php
        /**
         * Keep Neve's hooks for compatibility
         */
        do_action('neve_before_header_hook');
        do_action('neve_after_header_hook');
        ?>
    </header>

    <main id="primary" class="site-main">