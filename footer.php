<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Neve Child
 * @since   1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

?>

</div><!-- .neve-main -->

<?php
/**
 * Executes actions after the main tag.
 */
do_action('neve_after_primary');
?>

</main><!--/.main-->

<?php
/**
 * Executes actions after the main content.
 */
do_action('neve_before_footer');

// Include our custom MAC footer
get_template_part('components/mac-footer/footer-template');

/**
 * Executes actions after the footer content.
 */
do_action('neve_after_footer');
?>

<?php wp_footer(); ?>

</body>
</html>