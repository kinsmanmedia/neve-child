<?php
function enqueue_child_theme_styles() {
    wp_enqueue_style('neve-child', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'enqueue_child_theme_styles');

function register_custom_blocks() {
    // Helper function to get file version safely
    function get_file_version($file_path) {
        return file_exists($file_path) ? filemtime($file_path) : '1.0.0';
    }

    $stylesheet_dir = get_stylesheet_directory();
    $stylesheet_uri = get_stylesheet_directory_uri();

    // My Simple Block (only register if files exist)
    $my_block_js = $stylesheet_dir . '/assets/my-block.js';
    $my_block_css = $stylesheet_dir . '/assets/my-block.css';
    
    if (file_exists($my_block_js) && file_exists($my_block_css)) {
        wp_register_script(
            'my-block',
            $stylesheet_uri . '/assets/my-block.js',
            array('wp-blocks', 'wp-element', 'wp-block-editor'),
            get_file_version($my_block_js)
        );

        wp_register_style(
            'my-block-style',
            $stylesheet_uri . '/assets/my-block.css',
            array(),
            get_file_version($my_block_css)
        );

        register_block_type('my-theme/simple-block', array(
            'editor_script' => 'my-block',
            'style' => 'my-block-style',
        ));
    }

    // Mac Template Block
    $mac_template_js = $stylesheet_dir . '/assets/mac-template.js';
    $mac_template_css = $stylesheet_dir . '/assets/mac-template.css';
    
    if (file_exists($mac_template_js) && file_exists($mac_template_css)) {
        wp_register_script(
            'mac-template',
            $stylesheet_uri . '/assets/mac-template.js',
            array('wp-blocks', 'wp-element', 'wp-block-editor'),
            get_file_version($mac_template_js)
        );

        wp_register_style(
            'mac-template-style',
            $stylesheet_uri . '/assets/mac-template.css',
            array(),
            get_file_version($mac_template_css)
        );

        register_block_type('my-theme/mac-template', array(
            'editor_script' => 'mac-template',
            'style' => 'mac-template-style',
        ));
    }
}
add_action('init', 'register_custom_blocks');