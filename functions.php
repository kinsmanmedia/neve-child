<?php
function enqueue_child_theme_styles() {
    wp_enqueue_style('neve-child', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'enqueue_child_theme_styles');

function register_custom_blocks() {
    // My Simple Block
    wp_register_script(
        'my-block',
        get_stylesheet_directory_uri() . '/assets/my-block.js',
        array('wp-blocks', 'wp-element', 'wp-block-editor'),
        filemtime(get_stylesheet_directory() . '/assets/my-block.js')
    );

    wp_register_style(
        'my-block-style',
        get_stylesheet_directory_uri() . '/assets/my-block.css',
        array(),
        filemtime(get_stylesheet_directory() . '/assets/my-block.css')
    );

    register_block_type('my-theme/simple-block', array(
        'editor_script' => 'my-block',
        'style' => 'my-block-style',
    ));

    // Mac Template Block
    wp_register_script(
        'mac-template',
        get_stylesheet_directory_uri() . '/assets/mac-template.js',
        array('wp-blocks', 'wp-element', 'wp-block-editor'),
        filemtime(get_stylesheet_directory() . '/assets/mac-template.js')
    );

    wp_register_style(
        'mac-template-style',
        get_stylesheet_directory_uri() . '/assets/mac-template.css',
        array(),
        filemtime(get_stylesheet_directory() . '/assets/mac-template.css')
    );

    register_block_type('my-theme/mac-template', array(
        'editor_script' => 'mac-template',
        'style' => 'mac-template-style',
    ));
}
add_action('init', 'register_custom_blocks');