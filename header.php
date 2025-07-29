<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site mac">
    <?php
    // Include the custom header component
    require_once get_stylesheet_directory() . '/src/components/header/main.php';
    
    // Render the header component with default settings
    render_header_component([
        'logo_text' => get_bloginfo('name'),
        'logo_url' => home_url('/'),
        'show_search' => true,
        'menu_location' => 'primary',
        'sticky' => true
    ]);
    ?>
    
    <div id="content" class="site-content">