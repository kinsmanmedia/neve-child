<?php
/**
 * MAC Home Banner Component
 * Template part for the Mississauga Arts Council home page banner
 *
 * @package Neve Child
 * @since   1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

function neve_child_render_mac_home_banner_block($attributes, $content) {
    // Get attributes with defaults
    $banner_title = $attributes['banner_title'] ?? 'Welcome to Mississauga Arts Council';
    $banner_subtitle = $attributes['banner_subtitle'] ?? 'Empowering creativity and fostering artistic expression in our community';
    $banner_button_text = $attributes['banner_button_text'] ?? 'JOIN NOW';
    $banner_button_link = $attributes['banner_button_link'] ?? '/mac-membership';
    $banner_background_image = $attributes['banner_background_image'] ?? null;
    $banner_video_url = $attributes['banner_video_url'] ?? '';

    ob_start();
?>

<section class="mac-home-banner">
    <div class="mac-home-banner-top">
        <div class="banner-content">
            <div class="banner-container">
                <div class="banner-text">

                    <div class="site-branding">
                        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home" class="custom-logo-link">
                            <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/images/logo.png" alt="<?php bloginfo('name'); ?>" class="custom-logo">
                        </a>
                    </div>
                    
                    <!-- <h1 class="banner-title"><?php echo esc_html($banner_title); ?></h1>
                    <p class="banner-subtitle"><?php echo esc_html($banner_subtitle); ?></p> -->
                    <div class="banner-actions">
                        <a href="<?php echo esc_url($banner_button_link); ?>" class="btn btn-red banner-cta">
                            <?php echo esc_html($banner_button_text); ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mac-home-banner-bottom">
        <div class="banner-content">
            <div class="banner-container">
                card 1
            </div>
        </div>
    </div>
</section>

<?php
    return ob_get_clean();
}
