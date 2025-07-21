<?php
/**
 * Section block render template
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

function neve_child_render_section_block($attributes, $content) {
    $section_content = isset($attributes['content']) ? $attributes['content'] : '';

    if (empty($section_content)) {
        return '';
    }

    ob_start();
    ?>
    <div class="mac-section neve-section-block">
        <div class="mac-section-inner">
            <?php echo wp_kses_post($section_content); ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}