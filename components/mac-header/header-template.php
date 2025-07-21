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
                <?php if (has_custom_logo()) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <h1 class="site-title">
                        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                            <?php bloginfo('name'); ?>
                        </a>
                    </h1>
                    <?php if (get_bloginfo('description', 'display')) : ?>
                        <p class="site-description"><?php echo get_bloginfo('description', 'display'); ?></p>
                    <?php endif; ?>
                <?php endif; ?>
            </div>

            <div class="header-actions">
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
            </div>
        </div>

        <?php if (has_nav_menu('primary')) : ?>
            <nav class="main-navigation" role="navigation">
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                    <span class="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    <span class="menu-text"><?php esc_html_e('Menu', 'neve'); ?></span>
                </button>
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'menu_class'     => 'primary-menu',
                    'container'      => false,
                    'depth'          => 3,
                ));
                ?>
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