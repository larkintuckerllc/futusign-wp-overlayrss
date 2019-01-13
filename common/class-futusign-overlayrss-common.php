<?php
/**
 * The common functionality of the plugin.
 *
 * @link       https://bitbucket.org/futusign/futusign-wp-overlayrss
 * @since      0.1.0
 *
 * @package    futusign_overlayrss
 * @subpackage futusign_overlayrss/common
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}
/**
 * The common functionality of the plugin.
 *
 * @package    futusign_overlayrss
 * @subpackage futusign_overlayrss/common
 * @author     John Tucker <john@larkintuckerllc.com>
 */
class Futusign_OverlayRSS_Common {
	/**
	 * The image.
	 *
	 * @since    0.1.0
	 * @access   private
	 * @var      Futusign_OverlayRSS_Type    $rss    The rss
	 */
	private $rss;
	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    0.1.0
	 */
	public function __construct() {
		$this->load_dependencies();
		$this->rss = new Futusign_OverlayRSS_Type();
	}
	/**
	 * Load the required dependencies for module.
	 *
	 * @since    0.1.0
	 * @access   private
	 */
	private function load_dependencies() {
		require_once plugin_dir_path( __FILE__ ) . 'class-futusign-overlayrss-type.php';
	}
	/**
	 * Retrieve the rss
	 *
	 * @since     0.1.0
	 * @return    Futusign_OverlayRSS_Type    The rss functionality.
	 */
	public function get_rss() {
		return $this->rss;
	}
	/**
	* Add rewrite rules
	*
	* @since    0.5.0
	*/
	public function add_rewrite_rules() {
		add_rewrite_rule( '^fs-or-endpoint/?', 'index.php?futusign_or_endpoint=1', 'top' );
		add_rewrite_rule( '^fs-or-rss-endpoint/?', 'index.php?futusign_or_rss_endpoint=1', 'top' );
	}
}
