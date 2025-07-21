<?php
/**
 * Carousel block render template
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function neve_child_render_carousel_block($attributes, $content) {
    $slides = isset($attributes['slides']) ? $attributes['slides'] : [];

    if (empty($slides) || empty(array_filter($slides, function($slide) {
        return !empty($slide['content']);
    }))) {
        return '';
    }

    $carousel_id = 'carousel-' . wp_generate_uuid4();

    // Filter out empty slides and reindex
    $valid_slides = array_values(array_filter($slides, function($slide) {
        return !empty($slide['content']);
    }));
    
    $total_slides = count($valid_slides);
    
    ob_start();
    ?>
    <div class="neve-carousel-block" id="<?php echo esc_attr($carousel_id); ?>" data-total-slides="<?php echo $total_slides; ?>">
        <div class="neve-carousel-container">
            <div class="neve-carousel-slides">
                <?php foreach ($valid_slides as $index => $slide): ?>
                    <div class="neve-carousel-slide">
                        <?php echo wp_kses_post($slide['content']); ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <?php if ($total_slides > 1): // Show nav if more than 1 slide ?>
            <div class="neve-carousel-nav">
                <button class="neve-carousel-prev" aria-label="Previous slides">‹</button>
                <button class="neve-carousel-next" aria-label="Next slides">›</button>
            </div>
        <?php endif; ?>
        
        <?php if ($total_slides > 1): ?>
            <div class="neve-carousel-dots">
                <?php 
                // Calculate number of pages based on screen size
                $desktop_pages = ceil($total_slides / 3);
                $mobile_pages = $total_slides;
                ?>
                <?php for ($i = 0; $i < $desktop_pages; $i++): ?>
                    <button class="neve-carousel-dot <?php echo $i === 0 ? 'active' : ''; ?>" 
                            data-page="<?php echo $i; ?>" 
                            aria-label="Go to page <?php echo $i + 1; ?>"></button>
                <?php endfor; ?>
            </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}