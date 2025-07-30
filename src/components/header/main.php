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
 * Render header component function
 * This function is called by the theme's component system
 */
function render_header_component($args = []) {
    // Default arguments
    $defaults = [
        'logo_text' => get_bloginfo('name'),
        'logo_url' => home_url('/'),
        'show_search' => true,
        'menu_location' => 'primary',
        'sticky' => true,
        'cta_text' => __('JOIN NOW', 'neve'),
        'cta_url' => '/mac-membership'
    ];
    
    // Merge with provided arguments
    $args = wp_parse_args($args, $defaults);
    
    /**
     * Filters the header classes.
     *
     * @param string $header_classes Header classes.
     *
     * @since 2.3.7
     */
    $header_classes = apply_filters('nv_header_classes', 'header mac-header');
    
    // Add sticky class if enabled
    if ($args['sticky']) {
        $header_classes .= ' sticky-header';
    }
    ?>

<header class="<?php echo esc_attr($header_classes); ?>" 
        <?php echo (function_exists('neve_is_amp') && neve_is_amp()) ? 'next-page-hide' : ''; ?>
        role="banner">
    
    <!-- Skip link for accessibility -->
    <a class="neve-skip-link show-on-focus" href="#content">
        <?php echo esc_html__('Skip to content', 'neve'); ?>
    </a>
    
    <!-- Custom Header Content for Mississauga Arts Council -->
    <div class="mac-header-container">
        <div class="header-top">
            <div class="site-branding">
                <a href="<?php echo esc_url($args['logo_url']); ?>" 
                   rel="home" 
                   class="custom-logo-link"
                   aria-label="<?php echo esc_attr(get_bloginfo('name') . ' - ' . __('Home', 'neve')); ?>">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <span class="site-title"><?php echo esc_html($args['logo_text']); ?></span>
                    <?php endif; ?>
                </a>
                
                <?php 
                $tagline = get_bloginfo('description');
                if ($tagline) : ?>
                    <p class="site-description screen-reader-text"><?php echo esc_html($tagline); ?></p>
                <?php endif; ?>
            </div>

            <div class="header-actions">
                <!-- Desktop CTA Button -->
                <div class="header-cta-button desktop-only">
                    <a href="<?php echo esc_url($args['cta_url']); ?>" 
                       class="btn btn-red"
                       aria-label="<?php echo esc_attr($args['cta_text'] . ' - ' . __('Opens membership page', 'neve')); ?>">
                        <?php echo esc_html($args['cta_text']); ?>
                    </a>
                </div>
                
                <?php if (has_nav_menu('header-menu')) : ?>
                    <nav class="header-navigation" 
                         role="navigation" 
                         aria-label="<?php esc_attr_e('Header menu', 'neve'); ?>">
                        <?php
                        wp_nav_menu(array(
                            'theme_location' => 'header-menu',
                            'menu_class'     => 'header-menu',
                            'container'      => false,
                            'depth'          => 2,
                            'fallback_cb'    => false,
                        ));
                        ?>
                    </nav>
                <?php endif; ?>
                
                <!-- Mobile hamburger menu button -->
                <button class="menu-toggle" 
                        type="button"
                        aria-controls="primary-menu" 
                        aria-label="<?php esc_attr_e('Toggle mobile menu', 'neve'); ?>" 
                        aria-expanded="false">
                    <span class="hamburger-icon">
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </span>
                    <span class="screen-reader-text"><?php esc_html_e('Menu', 'neve'); ?></span>
                </button>
            </div>
        </div>

        <?php if (has_nav_menu('primary')) : ?>
            <nav class="main-navigation" 
                 role="navigation" 
                 aria-label="<?php esc_attr_e('Primary menu', 'neve'); ?>">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'menu_class'     => 'primary-menu',
                    'container'      => false,
                    'depth'          => 3,
                    'fallback_cb'    => '__return_false',
                    'walker'         => class_exists('MAC_Custom_Nav_Walker') ? new MAC_Custom_Nav_Walker() : null,
                ));
                ?>
                
                <!-- Mobile CTA Button -->
                <div class="mobile-cta-button mobile-only">
                    <a href="<?php echo esc_url($args['cta_url']); ?>" 
                       class="btn btn-red"
                       aria-label="<?php echo esc_attr($args['cta_text'] . ' - ' . __('Opens membership page', 'neve')); ?>">
                        <?php echo esc_html($args['cta_text']); ?>
                    </a>
                </div>
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

<?php
}

/**
 * Custom navigation walker for better mobile menu handling
 */
if (!class_exists('MAC_Custom_Nav_Walker')) {
    class MAC_Custom_Nav_Walker extends Walker_Nav_Menu {
        
        // Add dropdown toggle buttons for parent items
        function start_lvl(&$output, $depth = 0, $args = null) {
            $indent = str_repeat("\t", $depth);
            $output .= "\n$indent<ul class=\"sub-menu\">\n";
        }

        function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
            $indent = ($depth) ? str_repeat("\t", $depth) : '';
            
            $classes = empty($item->classes) ? array() : (array) $item->classes;
            $classes[] = 'menu-item-' . $item->ID;
            
            // Check if item has children
            $has_children = in_array('menu-item-has-children', $classes);
            
            $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
            $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

            $id = apply_filters('nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args);
            $id = $id ? ' id="' . esc_attr($id) . '"' : '';

            $output .= $indent . '<li' . $id . $class_names .'>';

            $attributes = ! empty($item->attr_title) ? ' title="'  . esc_attr($item->attr_title) .'"' : '';
            $attributes .= ! empty($item->target)     ? ' target="' . esc_attr($item->target     ) .'"' : '';
            $attributes .= ! empty($item->xfn)        ? ' rel="'    . esc_attr($item->xfn        ) .'"' : '';
            $attributes .= ! empty($item->url)        ? ' href="'   . esc_attr($item->url        ) .'"' : '';

            $item_output = isset($args->before) ? $args->before : '';
            $item_output .= '<a' . $attributes . '>';
            $item_output .= (isset($args->link_before) ? $args->link_before : '') . apply_filters('the_title', $item->title, $item->ID) . (isset($args->link_after) ? $args->link_after : '');
            $item_output .= '</a>';
            
            // Add toggle button for mobile dropdowns
            if ($has_children && $depth === 0) {
                $item_output .= '<button class="dropdown-toggle" aria-expanded="false" aria-label="' . 
                               esc_attr(sprintf(__('Toggle %s submenu', 'neve'), $item->title)) . '">
                               <span class="dropdown-icon"></span></button>';
            }
            
            $item_output .= isset($args->after) ? $args->after : '';

            $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
        }
    }
}