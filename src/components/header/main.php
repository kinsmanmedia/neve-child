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
 * Render header component function
 * This function is called by the theme's component system
 */
function render_header_component($args = []) {
    // Default arguments
    $defaults = [
        'logo_text' => get_bloginfo('name'),
        'logo_url' => home_url('/'),
        'show_search' => true,
        'menu_location' => 'primary',
        'sticky' => true
    ];
    
    // Merge with provided arguments
    $args = wp_parse_args($args, $defaults);
    
    /**
     * Filters the header classes.
     *
     * @param string $header_classes Header classes.
     *
     * @since 2.3.7
     */
    $header_classes = apply_filters('nv_header_classes', 'header custom-header');
    ?>

<header class="mac <?php echo esc_attr($header_classes); ?>" <?php echo (function_exists('neve_is_amp') && neve_is_amp()) ? 'next-page-hide' : ''; ?>>
    <a class="neve-skip-link show-on-focus" href="#content">
        <?php echo __('Skip to content', 'neve'); ?>
    </a>
    
    <!-- Custom Header Content for Mississauga Arts Council -->
    <div class="custom-header-container">
        <div class="header-top">
            <div class="site-branding">
                <a href="<?php echo esc_url(home_url('/')); ?>" rel="home" class="custom-logo-link">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <span class="site-title"><?php bloginfo('name'); ?></span>
                    <?php endif; ?>
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

<?php
}