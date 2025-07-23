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

/**
 * Render function for mac-home-banner component
 */
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
    <!-- Scrolling Background Elements -->
    <div class="scrolling-bg-container">
        <div class="scroll-circle" id="scroll-circle-1"></div>
        <div class="scroll-circle" id="scroll-circle-2"></div>
        <div class="scroll-circle" id="scroll-circle-3"></div>
        <div class="scroll-circle" id="scroll-circle-4"></div>
    </div>

    <?php if ($banner_video_url) : ?>
        <!-- Video Background -->
        <div class="banner-video-background">
            <video autoplay muted loop playsinline>
                <source src="<?php echo esc_url($banner_video_url); ?>" type="video/mp4">
            </video>
            <div class="video-overlay"></div>
        </div>
    <?php elseif ($banner_background_image) : ?>
        <!-- Image Background -->
        <div class="banner-image-background">
            <img src="<?php echo esc_url($banner_background_image['url']); ?>" alt="<?php echo esc_attr($banner_background_image['alt']); ?>">
            <div class="image-overlay"></div>
        </div>
    <?php endif; ?>
    
    <div class="banner-content">
        <div class="banner-container">
            <div class="banner-text">
                <h1 class="banner-title"><?php echo esc_html($banner_title); ?></h1>
                <p class="banner-subtitle"><?php echo esc_html($banner_subtitle); ?></p>
                <div class="banner-actions">
                    <a href="<?php echo esc_url($banner_button_link); ?>" class="btn btn-red banner-cta">
                        <?php echo esc_html($banner_button_text); ?>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php
    return ob_get_clean();
}