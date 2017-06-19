<?php
/**
 * The public-specific functionality of the plugin.
 *
 * @link       https://bitbucket.org/futusign/futusign-wp-overlayrss
 * @since      0.1.0
 *
 * @package    futusign_overlayrss
 * @subpackage futusign_overlayrss/public
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}
/**
 * The public-specific functionality of the plugin.
 *
 * @package    futusign_overlayrss
 * @subpackage futusign_overlayrss/public
 * @author     John Tucker <john@larkintuckerllc.com>
 */
class Futusign_OverlayRSS_Public {
	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    0.1.0
	 */
	public function __construct() {
	}
	/**
	 * Return single templates
	 *
	 * @since    0.1.0
	 * @param    string      $single     path to template
	 * @return   string      path to template
	 */
	public function single_template( $single ) {
		global $post;
		if ($post->post_type == 'futusign_ov_widget' && $post->post_title == 'RSS'){
			return plugin_dir_path( __FILE__ ) . 'futusign-overlayrss-template.php';
		}
		return $single;
	}
}
