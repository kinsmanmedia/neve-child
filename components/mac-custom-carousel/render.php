<?php
/**
 * MAC Custom Carousel Block Template
 * 
 * @package Neve Child
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render function for MAC Custom Carousel block
 */
function neve_child_render_mac_custom_carousel_block($attributes) {
    ob_start();

    $cards = $attributes['cards'] ?? [];

    if (empty($cards)) {
        return '';
    }

    // Enqueue carousel scripts and styles
    wp_enqueue_script('mac-custom-carousel', get_stylesheet_directory_uri() . '/components/mac-custom-carousel/carousel.js', [], '1.0.0', true);
    wp_enqueue_style('mac-custom-carousel', get_stylesheet_directory_uri() . '/components/mac-custom-carousel/style.css', [], '1.0.0');

    $block_classes = ['mac-custom-carousel'];
    if (!empty($attributes['align'])) {
        $block_classes[] = 'align' . $attributes['align'];
    }
?>

<section class="<?php echo esc_attr(implode(' ', $block_classes)); ?>">
    <div class="container">
        <div class="custom-carousel-container">
            <div class="custom-carousel">
                <div class="custom-track">
                    <?php foreach ($cards as $card): ?>
                        <div class="custom-card">
                            <?php if (!empty($card['image'])): ?>
                                <div class="custom-card-image">
                                    <?php if (!empty($card['link'])): ?>
                                        <a href="<?php echo esc_url($card['link']); ?>">
                                    <?php endif; ?>
                                    <img src="<?php echo esc_url($card['image']); ?>" 
                                         alt="<?php echo esc_attr($card['title']); ?>" 
                                         class="custom-card-thumbnail">
                                    <?php if (!empty($card['link'])): ?>
                                        </a>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>
                            
                            <div class="custom-card-content">
                                <?php if (!empty($card['title'])): ?>
                                    <h3 class="custom-card-title">
                                        <?php echo esc_html($card['title']); ?>
                                    </h3>
                                <?php endif; ?>
                                
                                <?php if (!empty($card['content'])): ?>
                                    <div class="custom-card-description">
                                        <?php echo wp_kses_post($card['content']); ?>
                                    </div>
                                <?php endif; ?>
                                
                                <?php if (!empty($card['link']) && !empty($card['linkText'])): ?>
                                    <div class="custom-card-actions">
                                        <a href="<?php echo esc_url($card['link']); ?>" 
                                           class="custom-card-button">
                                            <?php echo esc_html($card['linkText']); ?>
                                        </a>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            
            <div class="custom-carousel-controls">
                <div class="custom-carousel-navigation">
                    <button class="custom-carousel-btn custom-carousel-prev" 
                            aria-label="Previous cards">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    
                    <div class="custom-carousel-dots" role="tablist"></div>
                    
                    <button class="custom-carousel-btn custom-carousel-next" 
                            aria-label="Next cards">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>
<?php
    return ob_get_clean();
}