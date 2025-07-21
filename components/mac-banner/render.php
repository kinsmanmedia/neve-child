<?php
/**
 * MAC Banner component render template
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function neve_child_render_mac_banner_block($attributes, $content) {
    $title = isset($attributes['title']) ? $attributes['title'] : '';
    $subtitle = isset($attributes['subtitle']) ? $attributes['subtitle'] : '';
    $background_image = isset($attributes['backgroundImage']) ? $attributes['backgroundImage'] : '';
    $background_color = isset($attributes['backgroundColor']) ? $attributes['backgroundColor'] : '';
    $title_color = isset($attributes['titleColor']) ? $attributes['titleColor'] : '';
    $subtitle_color = isset($attributes['subtitleColor']) ? $attributes['subtitleColor'] : '';
    $alignment = isset($attributes['alignment']) ? $attributes['alignment'] : 'left';
    $height = isset($attributes['height']) ? $attributes['height'] : 'medium';
    $button_text = isset($attributes['buttonText']) ? $attributes['buttonText'] : '';
    $button_url = isset($attributes['buttonUrl']) ? $attributes['buttonUrl'] : '';
    $overlay_opacity = isset($attributes['overlayOpacity']) ? $attributes['overlayOpacity'] : 50;

    // Build CSS classes
    $classes = [
        'mac-banner-component',
        'mac-banner-' . $alignment,
        'mac-banner-' . $height
    ];

    // Build inline styles
    $styles = [];
    if ($background_color) {
        $styles[] = 'background-color: ' . esc_attr($background_color);
    }
    if ($background_image) {
        $styles[] = 'background-image: url(' . esc_url($background_image) . ')';
    }

    $style_attr = !empty($styles) ? ' style="' . implode('; ', $styles) . '"' : '';

    ob_start();
    ?>
    <div class="<?php echo esc_attr(implode(' ', $classes)); ?>"<?php echo $style_attr; ?>>
        <?php if ($background_image && $overlay_opacity > 0): ?>
            <div class="neve-banner-overlay" style="opacity: <?php echo esc_attr($overlay_opacity / 100); ?>"></div>
        <?php endif; ?>
        
        <div class="neve-banner-content">
            <?php if ($title): ?>
                <h2 class="neve-banner-title" <?php echo $title_color ? 'style="color: ' . esc_attr($title_color) . '"' : ''; ?>>
                    <?php echo wp_kses_post($title); ?>
                </h2>
            <?php endif; ?>
            
            <?php if ($subtitle): ?>
                <p class="neve-banner-subtitle" <?php echo $subtitle_color ? 'style="color: ' . esc_attr($subtitle_color) . '"' : ''; ?>>
                    <?php echo wp_kses_post($subtitle); ?>
                </p>
            <?php endif; ?>
            
            <?php if ($button_text && $button_url): ?>
                <a href="<?php echo esc_url($button_url); ?>" class="neve-banner-button btn">
                    <?php echo esc_html($button_text); ?>
                </a>
            <?php endif; ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}