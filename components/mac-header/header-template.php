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

/**
 * Filters the header classes.
 *
 * @param string $header_classes Header classes.
 *
 * @since 2.3.7
 */
$header_classes = apply_filters('nv_header_classes', 'header custom-header');
?>

<header class="<?php echo esc_attr($header_classes); ?>" <?php echo (neve_is_amp()) ? 'next-page-hide' : ''; ?>>
    <a class="neve-skip-link show-on-focus" href="#content">
        <?php echo __('Skip to content', 'neve'); ?>
    </a>
    
    <!-- Custom Header Content for Mississauga Arts Council -->
    <div class="custom-header-container">
        <div class="header-top">
            <div class="site-branding">
                <a href="<?php echo esc_url(home_url('/')); ?>" rel="home" class="custom-logo-link">
                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.png" alt="<?php bloginfo('name'); ?>" class="custom-logo">
                </a>
            </div>

            <div class="header-actions">
                <!-- Desktop CTA Button -->
                <div class="header-cta-button desktop-only">
                    <a href="/mac-membership" class="btn btn-red">JOIN NOW</a>
                </div>
                
                <?php if (has_nav_menu('header-menu')) : ?>
                    <nav class="header-navigation" role="navigation">
                        <?php
                        wp_nav_menu(array(
                            'theme_location' => 'header-menu',
                            'menu_class'     => 'header-menu',
                            'container'      => false,
                            'depth'          => 2,
                        ));
                        ?>
                    </nav>
                <?php endif; ?>
                
                <!-- Mobile hamburger menu button -->
                <div class="menu-toggle" aria-controls="primary-menu" aria-label="<?php esc_html_e('Menu', 'neve'); ?>" aria-expanded="false">
                    <span class="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </div>

            </div>
        </div>

        <?php if (has_nav_menu('primary')) : ?>
            <nav class="main-navigation" role="navigation">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'menu_class'     => 'primary-menu',
                    'container'      => false,
                    'depth'          => 3,
                    'add_li_class'   => 'menu-item',
                    'link_before'    => '',
                    'link_after'     => '',
                ));
                ?>
                
                <!-- Mobile CTA Button -->
                <div class="mobile-cta-button mobile-only">
                    <a href="/mac-membership" class="btn btn-red">JOIN NOW</a>
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