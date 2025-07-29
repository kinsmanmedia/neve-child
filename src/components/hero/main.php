<?php
function render_hero_component($args = []) {
    $defaults = [
        'title' => get_bloginfo('name'),
        'subtitle' => get_bloginfo('description'),
        'background_image' => '',
        'cta_text' => 'Learn More',
        'cta_url' => '#'
    ];
    
    $args = wp_parse_args($args, $defaults);
    ?>
    <section class="hero-component" data-component="hero">
        <div class="hero-content">
            <h1 class="hero-title"><?php echo esc_html($args['title']); ?></h1>
            <p class="hero-subtitle"><?php echo esc_html($args['subtitle']); ?></p>
            <?php if ($args['cta_text'] && $args['cta_url']) : ?>
                <a href="<?php echo esc_url($args['cta_url']); ?>" class="hero-cta">
                    <?php echo esc_html($args['cta_text']); ?>
                </a>
            <?php endif; ?>
        </div>
    </section>
    <?php
}
?>