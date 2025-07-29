<?php
/**
 * The main template file
 * 
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 */

get_header(); ?>

<div class="container">
    <main id="primary" class="site-main">
        
        <?php if (have_posts()) : ?>
            
            <?php while (have_posts()) : the_post(); ?>
                
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <h1 class="entry-title">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h1>
                    </header>

                    <div class="entry-content">
                        <?php the_content(); ?>
                    </div>
                </article>
                
            <?php endwhile; ?>
            
        <?php else : ?>
            
            <p><?php esc_html_e('Sorry, no posts matched your criteria.'); ?></p>
            
        <?php endif; ?>
        
    </main>
</div>

<?php get_footer(); ?>