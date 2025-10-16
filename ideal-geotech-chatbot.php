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
        'order_page' => site_url(),
        'support_email' => 'info@idealcorp.com.au',
        'gf_form_id' => 31,
        'ajax_url' => admin_url('admin-ajax.php')
    ]);
});

add_action('wp_footer', function() {
    ?>
    <div id="igc-chatbot">
        
        <div class="igc-header">
          <div class="igc-avatar">J</div>
          <div class="igc-header-text">
            <div class="igc-name">Jamie – Ideal Geotech</div>
            <div class="igc-subtitle">Your friendly guide</div>
          </div>
          <button class="igc-back" id="igc-back">
            <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38 24.0803L10 24.0803M10 24.0803L24 38.0803M10 24.0803L24 10.0803" stroke="#FF6600" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="igc-body"></div>
        <div class="igc-footer">
            <small>Need more help? Email <a href="mailto:info@idealcorp.com.au">info@idealcorp.com.au</a></small>
        </div>
    </div>
    <div id="igc-chat-toggle-wrapper">
      <div class="igc-tooltip">
        <p class="igc-title">Got a Question?</p>
        <p class="igc-subtitle">Ask the Jamie Virtual Assistant</p>
        <span class="igc-close">&times;</span>
      </div>
    
      <button id="igc-toggle">
        <img draggable="false" style= "height: 2em;
    width: 2em;" alt="💬" src="<?php echo plugin_dir_url(__FILE__); ?>assets/img/chat-icon.png">
      </button>
    </div>
    <?php
});

add_action('wp_ajax_igc_load_form', 'igc_load_form');
add_action('wp_ajax_nopriv_igc_load_form', 'igc_load_form');
function igc_load_form() {
    // $form_id = intval($_POST['form_id']);
    echo do_shortcode('[gravityform id="31" ajax="true"]');
    wp_die();
}
?>
