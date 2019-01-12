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
		$title = $post->post_title;
		if ($post->post_type == 'futusign_ov_widget' && preg_match( '/^RSS/', $title ) === 1){
			return plugin_dir_path( __FILE__ ) . 'futusign-overlayrss-template.php';
		}
		return $single;
	}
	/**
	 * Add to query variables
	 *
	 * @since    0.5.0
	 * @param    array      $query_vars     query variables
	 * @return   array      query variables
	 */
	public function query_vars( $query_vars ) {
    $query_vars[] = 'futusign_or_endpoint';
		$query_vars[] = 'futusign_or_widget_id';
		$query_vars[] = 'futusign_or_rss_endpoint';
		$query_vars[] = 'futusign_or_rss_url';
		return $query_vars;
	}
	/**
	 * Define fs-or-endpoint and fs-or-rss-endpoint
	 *
	 * @since    0.5.0
	 * @param    array      $query     query
	 */
	public function parse_request( $query ) {
		$query_vars = $query->query_vars;
		if ( array_key_exists( 'futusign_or_endpoint', $query_vars ) ) {
      if ( array_key_exists( 'futusign_or_widget_id', $query_vars ) ) {
  			require_once plugin_dir_path( __FILE__ ) . 'partials/futusign-or-endpoint.php';
				futusign_or_endpoint( $query_vars['futusign_or_widget_id'] );
			} else {
				status_header(400);
			}
			exit();
		}
		if ( array_key_exists( 'futusign_or_rss_endpoint', $query_vars ) ) {
      if ( array_key_exists( 'futusign_or_rss_url', $query_vars ) ) {
  			require_once plugin_dir_path( __FILE__ ) . 'partials/futusign-or-rss-endpoint.php';
				futusign_or_rss_endpoint( $query_vars['futusign_or_rss_url'] );
			} else {
				status_header(400);
			}
			status_header(400);
			exit();
		}
		return;
	}
}
