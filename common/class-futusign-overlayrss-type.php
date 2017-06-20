<?php
/**
 * Define the rss functionality
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
 * Define the rss functionality.
*
 * @since      1.0.0
 * @package    futusign_overlayrss
 * @subpackage futusign_overlayrss/common
 * @author     John Tucker <john@larkintuckerllc.com>
 */
class Futusign_OverlayRSS_Type {
	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    0.1.0
	 */
	public function __construct() {
	}
	/**
	 * Register the rss post type.
	 *
	 * @since    0.1.0
	 */
	public function register() {
		$labels = array(
			'name' => __( 'Overlay RSS', 'futusign_overlayrss' ),
			'singular_name' => __( 'Overlay RSS', 'futusign_overlayrss' ),
			'add_new' => __( 'Add New' , 'futusign_overlayrss' ),
			'add_new_item' => __( 'Add New Overlay RSS' , 'futusign_overlayrss' ),
			'edit_item' =>  __( 'Edit Overlay RSS' , 'futusign_overlayrss' ),
			'new_item' => __( 'New Overlay RSS' , 'futusign_overlayrss' ),
			'view_item' => __('View Overlay RSS', 'futusign_overlayrss'),
			'search_items' => __('Search Overlay RSS', 'futusign_overlayrss'),
			'not_found' =>  __('No Overlay RSS found', 'futusign_overlayrss'),
			'not_found_in_trash' => __('No Overlay RSS found in Trash', 'futusign_overlayrss'),
		);
		register_post_type( 'futusign_overlay_rss',
			array(
				'labels' => $labels,
				'public' => true,
				'exclude_from_search' => false,
				'publicly_queryable' => false,
				'show_in_nav_menus' => false,
				'has_archive' => false,
				'menu_icon' => plugins_url( 'img/rss.png', __FILE__ )
			)
		);
	}
	/**
	 * Create widget on publish
	 *
	 * @since    0.1.0
	 * @param    number    $ID            Id
	 * @param    string    $post          Post
	 */
	 public function publish( $ID, $post ) {
		 $widgetID = wp_insert_post(
			 array(
				 'post_type' => 'futusign_ov_widget',
				 'post_status' => 'publish',
				 'post_title' => 'RSS - '. get_the_title($post),
			 )
		 );
		 add_post_meta( $widgetID, 'rssID', strval($ID), true );
	 }
	/**
	 * Remove widget on draft
	 *
	 * @since    0.1.0
	 * @param    number    $ID            Id
	 * @param    string    $post          Post
	 */
	public function unpublish( $ID, $post ) {
		$strID = strval($ID);
		$args = array(
			'post_type' => 'futusign_ov_widget',
			'posts_per_page' => -1,
		);
		$loop = new WP_Query( $args );
		while ( $loop->have_posts() ) {
			$loop->the_post();
			$loopID = get_the_ID();
			$rssID = get_post_meta( $loopID, 'rssID', true );
			if ( $rssID === $strID ) {
				wp_delete_post($loopID, true);
			}
		}
		wp_reset_query();
	}
}
