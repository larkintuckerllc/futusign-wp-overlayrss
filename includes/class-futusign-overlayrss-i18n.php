<?php
/**
 * Define the internationalization functionality
 *
 * @link       https://bitbucket.org/futusign/futusign-wp-overlayrss
 * @since      0.1.0
 *
 * @package    futusign_overlayrss
 * @subpackage futusign_overlayrss/includes
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}
/**
 * Define the internationalization functionality.
 *
 * @since      0.1.0
 * @package    futusign_overlayrss
 * @subpackage futusign_overlayrss/includes
 * @author     John Tucker <john@larkintuckerllc.com>
 */
class Futusign_OverlayRSS_i18n {
	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    0.1.0
	 */
	public function load_plugin_textdomain() {
		load_plugin_textdomain(
			'futusign_overlayrss',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);
	}
}
