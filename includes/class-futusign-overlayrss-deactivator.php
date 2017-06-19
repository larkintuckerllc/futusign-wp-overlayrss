<?php
/**
 * Fired during plugin deactivation
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
 * Fired during plugin deactiviation.
 *
 * @since      0.1.0
 * @package    futusign_overlayrss
 * @subpackage futusign_overlayrss/includes
 * @author     John Tucker <john@larkintuckerllc.com>
 */
class Futusign_OverlayRSS_Deactivator {
	/**
	 * Fired during plugin deactivation.
	 *
	 * @since    0.1.0
	 */
	public static function deactivate() {
		$args = array(
			'post_type' => 'futusign_ov_widget',
			'posts_per_page' => -1,
		);
		$loop = new WP_Query( $args );
		while ( $loop->have_posts() ) {
			$loop->the_post();
			$loopID = get_the_ID();
			$rssID = intval(get_post_meta( $loopID, 'rssID', true ), 10);
			if ($rssID !== null) {
				wp_delete_post($loopID, true);
				wp_delete_post($rssID, true);
			}
		}
		wp_reset_query();
	}
}
