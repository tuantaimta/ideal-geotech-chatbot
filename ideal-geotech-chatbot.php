<?php
/**
 * Plugin Name: Ideal Geotech Chatbot
 * Description: Chatbot Jamie – Ideal Geotech flow tích hợp Gravity Forms.
 * Version: 1.0
 * Author: Tuantaimta
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'IGC_PATH', plugin_dir_path( __FILE__ ) );
define( 'IGC_URL', plugin_dir_url( __FILE__ ) );

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('igc-style', IGC_URL . 'assets/css/style.css');
    wp_enqueue_script('igc-script', IGC_URL . 'assets/js/chatbot.js', ['jquery'], null, true);

    wp_localize_script('igc-script', 'igc_vars', [
        'order_page' => site_url('/order-now'),
        'support_email' => 'info@idealcorp.com.au',
        'gf_form_id' => 31,
        'ajax_url' => admin_url('admin-ajax.php')
    ]);
});

add_action('wp_footer', function() {
    ?>
    <div id="igc-chatbot">
        <div class="igc-header">
            <span>Jamie – Ideal Geotech</span>
            <button id="igc-close">×</button>
        </div>
        <div class="igc-body"></div>
        <div class="igc-footer">
            <small>Need more help? Email <a href="mailto:info@idealcorp.com.au">info@idealcorp.com.au</a></small>
        </div>
    </div>
    <button id="igc-toggle">💬</button>
    <?php
});

add_action('wp_ajax_igc_load_form', 'igc_load_form');
add_action('wp_ajax_nopriv_igc_load_form', 'igc_load_form');
function igc_load_form() {
    $form_id = intval($_POST['form_id']);
    echo do_shortcode('[gravityform id="'.$form_id.'" ajax="true"]');
    wp_die();
}
?>
