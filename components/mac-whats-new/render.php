<?php
/**
 * What's New at MAC Component
 * Displays recent articles and news with customizable settings
 *
 * @package Neve Child
 * @since   1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('neve_child_render_mac_whats_new_block')) {
    function neve_child_render_mac_whats_new_block($attributes, $content) {
        // Get attributes with defaults
        $section_title = $attributes['section_title'] ?? "What's New at MAC?";
        $section_subtitle = $attributes['section_subtitle'] ?? 'Stay up to date with the latest news, events, and announcements from the Mississauga Arts Council';
        $posts_count = 6; // Fixed to 6 posts for carousel
        $show_excerpt = $attributes['show_excerpt'] ?? true;
        $show_date = $attributes['show_date'] ?? true;
        $show_author = $attributes['show_author'] ?? false;
        $show_featured_image = $attributes['show_featured_image'] ?? true;
        $post_category = $attributes['post_category'] ?? '';
        $read_more_text = $attributes['read_more_text'] ?? 'Read More';
        $view_all_text = $attributes['view_all_text'] ?? 'View All News';
        $view_all_link = $attributes['view_all_link'] ?? '/news';

        // Prepare query arguments
        $query_args = array(
            'post_type' => 'post',
            'posts_per_page' => $posts_count,
            'post_status' => 'publish',
            'orderby' => 'date',
            'order' => 'DESC'
        );

        // Add category filter if specified
        if (!empty($post_category) && $post_category !== 'all') {
            $query_args['category_name'] = $post_category;
        }

        // Get recent posts
        $recent_posts = new WP_Query($query_args);

        ob_start();
        ?>

        <section class="mac-whats-new">
            <div class="mac-whats-new-header">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title"><?php echo esc_html($section_title); ?></h2>
                        <?php if (!empty($section_subtitle)): ?>
                            <p class="section-subtitle"><?php echo esc_html($section_subtitle); ?></p>
                        <?php endif; ?>
                    </div>
                </div>
            </div>

            <div class="mac-whats-new-content">
                <div class="container">
                    <?php if ($recent_posts->have_posts()): ?>
                        <div class="articles-carousel-container">
                            <div class="articles-carousel">
                                <div class="articles-track">
                                    <?php while ($recent_posts->have_posts()): $recent_posts->the_post(); ?>
                                        <article class="article-card">
                                            <?php if ($show_featured_image && has_post_thumbnail()): ?>
                                                <div class="article-image">
                                                    <a href="<?php the_permalink(); ?>" aria-label="<?php the_title_attribute(); ?>">
                                                        <?php the_post_thumbnail('medium', array('class' => 'article-thumbnail')); ?>
                                                    </a>
                                                </div>
                                            <?php endif; ?>

                                            <div class="article-content">
                                                <div class="article-meta">
                                                    <?php if ($show_date): ?>
                                                        <time class="article-date" datetime="<?php echo get_the_date('c'); ?>">
                                                            <?php echo get_the_date('F j, Y'); ?>
                                                        </time>
                                                    <?php endif; ?>
                                                    
                                                    <?php if ($show_author): ?>
                                                        <span class="article-author">
                                                            by <?php the_author(); ?>
                                                        </span>
                                                    <?php endif; ?>
                                                </div>

                                                <h3 class="article-title">
                                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                                </h3>

                                                <?php if ($show_excerpt): ?>
                                                    <div class="article-excerpt">
                                                        <?php 
                                                        $excerpt = get_the_excerpt();
                                                        // Truncate to approximately 3 lines worth of text (about 180 characters)
                                                        if (strlen($excerpt) > 180) {
                                                            $words = explode(' ', $excerpt);
                                                            $excerpt = '';
                                                            $char_count = 0;
                                                            foreach ($words as $word) {
                                                                if ($char_count + strlen($word) + 1 > 180) {
                                                                    break;
                                                                }
                                                                $excerpt .= $word . ' ';
                                                                $char_count += strlen($word) + 1;
                                                            }
                                                            $excerpt = trim($excerpt) . '...';
                                                        }
                                                        echo esc_html($excerpt);
                                                        ?>
                                                    </div>
                                                <?php endif; ?>

                                                <div class="article-actions">
                                                    <a href="<?php the_permalink(); ?>" class="btn btn-red">
                                                        <?php echo esc_html($read_more_text); ?>
                                                    </a>
                                                </div>
                                            </div>
                                        </article>
                                    <?php endwhile; ?>
                                </div>
                            </div>
                            
                            <!-- Carousel Navigation - Bottom positioned -->
                            <div class="carousel-controls">
                                <!-- Navigation Arrows -->
                                <div class="carousel-navigation">
                                    <button class="carousel-btn carousel-prev" aria-label="Previous articles">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                    
                                    <!-- Carousel Dots in middle -->
                                    <div class="carousel-dots">
                                        <?php
                                        // Desktop: 2 slides (3 articles each), Mobile: 6 slides (1 article each)
                                        // We'll let JavaScript handle the dynamic generation based on screen size
                                        for ($i = 0; $i < 2; $i++): // Default to 2 dots, JS will adjust
                                        ?>
                                            <button class="mac-carousel-dot<?php echo $i === 0 ? ' active' : ''; ?>" 
                                                    data-slide="<?php echo $i; ?>" 
                                                    aria-label="Go to slide <?php echo $i + 1; ?>"></button>
                                        <?php endfor; ?>
                                    </div>
                                    
                                    <button class="carousel-btn carousel-next" aria-label="Next articles">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <?php if (!empty($view_all_link)): ?>
                            <div class="section-footer">
                                <a href="<?php echo esc_url($view_all_link); ?>" class="btn btn-yellow">
                                    <?php echo esc_html($view_all_text); ?>
                                </a>
                            </div>
                        <?php endif; ?>

                    <?php else: ?>
                        <div class="no-posts-message">
                            <p>No recent articles found. Check back soon for updates!</p>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </section>

        <?php
        wp_reset_postdata();
        
        // Enqueue carousel JavaScript
        wp_enqueue_script(
            'mac-whats-new-carousel',
            get_stylesheet_directory_uri() . '/components/mac-whats-new/carousel.js',
            array(),
            filemtime(get_stylesheet_directory() . '/components/mac-whats-new/carousel.js'),
            true
        );
        
        return ob_get_clean();
    }
}