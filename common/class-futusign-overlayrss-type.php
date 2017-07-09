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
	 * Register ACF Field Group
	 *
	 * @since    0.1.0
	 */
	// TODO: DEPRECATED REPLACE WITH ACF_ADD_LOCAL_FIELD_GROUP
	public function register_field_group() {
		if ( function_exists( 'register_field_group' ) ) {
			register_field_group( array (
				'id' => 'acf_futusign_overlay_rss',
				'key' => 'acf_futusign_overlay_rss',
				'title' => 'futusign Overlay RSS',
				'fields' => array (
					array (
						'key' => 'field_acf_fs_or_instructions',
						'label' => __('Instructions', 'futusign_overlayrss'),
						'name' => '',
						'type' => 'message',
						'message' => __('When updating; to force changes to all playing screens update version in futusign settings. Also, when updating, do not change the title.', 'futusign_overlayrss'),
					),
					array (
						'key' => 'field_acf_fs_or_url',
						'label' => __('URL', 'futusign_overlayrss'),
						'name' => 'url',
						'type' => 'text',
						'instructions' => __('The URL of the RSS feed', 'futusign_overlayrss'),
						'required' => 1,
						'default_value' => '',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'formatting' => 'none',
						'maxlength' => '',
					),
					array (
						'key' => 'field_acf_fs_or_cycling',
						'label' => __('Cycling', 'futusign_overlayrss'),
						'name' => 'cycling',
						'type' => 'number',
						'instructions' => __('The characters per second for scrolling; minimum 1 char / s', 'futusign_overlayrss'),
						'required' => 1,
						'default_value' => 1,
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'min' => 1,
						'max' => '',
						'step' => 1,
					),
					array (
						'key' => 'field_acf_fs_or_polling',
						'label' => __('Polling', 'futusign_overlayrss'),
						'name' => 'polling',
						'type' => 'number',
						'instructions' => __('The number of seconds between polling of RSS feed; minimum  60 seconds', 'futusign_overlayrss'),
						'required' => 1,
						'default_value' => 60,
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'min' => 60,
						'max' => '',
						'step' => 1,
					),
					array (
						'key' => 'field_acf_fs_or_size',
						'label' => __('Size', 'futusign_overlayrss'),
						'name' => 'size',
						'type' => 'number',
						'instructions' => __('The font size in pixels; minimum 10 pixels', 'futusign_overlayrss'),
						'required' => 1,
						'default_value' => 10,
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'min' => 10,
						'max' => '',
						'step' => 1,
					),
					array (
						'key' => 'field_acf_fs_or_theme',
						'label' => __('Theme', 'futusign_overlayrss'),
						'name' => 'theme',
						'type' => 'select',
						'instructions' => __('The color scheme', 'futusign_overlayrss'),
						'required' => 1,
						'choices' => array (
							'dark' => 'dark',
							'light' => 'light',
						),
						'default_value' => 'dark',
						'allow_null' => 0,
						'multiple' => 0,
					),
					// LIMIT ITEMS
					array (
						'key' => 'field_acf_fs_or_limit_items',
						'label' => __('Limit Items', 'futusign_overlayrss'),
						'name' => 'limit_items',
						'type' => 'radio',
						'instructions' => __('Set to true to limit the number of items; false to show all items', 'futusign_overlayrss'),
						'required' => 1,
						'choices' => array (
							'false' => 'false',
							'true' => 'true',
						),
						'other_choice' => 0,
						'save_other_choice' => 0,
						'default_value' => 'false',
						'layout' => 'vertical',
					),
					array (
						'key' => 'field_acf_fs_or_max_items',
						'label' => __('Maximum Items', 'futusign-overlayrss'),
						'name' => 'maximum_items',
						'type' => 'number',
						'instructions' => __('The maximum number of items to show; minimum 1 item', 'futusign_overlayrss'),
						'required' => 1,
						'conditional_logic' => array (
							'status' => 1,
							'rules' => array (
								array (
									'field' => 'field_acf_fs_or_limit_items',
									'operator' => '==',
									'value' => 'true',
								),
							),
							'allorany' => 'all',
						),
						'default_value' => 1,
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'min' => 1,
						'max' => '',
						'step' => 1,
					),
					// PUBLICATION DATES
					array (
						'key' => 'field_acf_fs_or_pub_dates',
						'label' => __('Publication Dates', 'futusign_overlayrss'),
						'name' => 'publication_dates',
						'type' => 'radio',
						'instructions' => __('Set to true to only show items with a publication date, sort by publication date, and show their date; false to show all items in the order provided by the RSS feed with no date shown', 'futusign_overlayrss'),
						'required' => 1,
						'choices' => array (
							'false' => 'false',
							'true' => 'true',
						),
						'other_choice' => 0,
						'save_other_choice' => 0,
						'default_value' => 'false',
						'layout' => 'vertical',
					),
					array (
						'key' => 'field_acf_fs_or_max_age',
						'label' => __('Maximum Age', 'futusign-overlayrss'),
						'name' => 'maximum_age',
						'type' => 'number',
						'instructions' => __('Only show items that are more recent than maximum age seconds; minimum 60 seconds', 'futusign_overlayrss'),
						'required' => 1,
						'conditional_logic' => array (
							'status' => 1,
							'rules' => array (
								array (
									'field' => 'field_acf_fs_or_pub_dates',
									'operator' => '==',
									'value' => 'true',
								),
							),
							'allorany' => 'all',
						),
						'default_value' => 60,
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'min' => 60,
						'max' => '',
						'step' => 1,
					),
					array (
						'key' => 'field_acf_fs_or_title',
						'label' => __('Title', 'futusign_overlayrss'),
						'name' => 'title',
						'type' => 'radio',
						'instructions' => __('Set to true to show title; false to not', 'futusign_overlayrss'),
						'required' => 1,
						'choices' => array (
							'false' => 'false',
							'true' => 'true',
						),
						'other_choice' => 0,
						'save_other_choice' => 0,
						'default_value' => 'true',
						'layout' => 'vertical',
					),
					array (
						'key' => 'field_acf_fs_or_description',
						'label' => __('Description', 'futusign_overlayrss'),
						'name' => 'description',
						'type' => 'radio',
						'instructions' => __('Set to true to show description; false to not', 'futusign_overlayrss'),
						'required' => 1,
						'choices' => array (
							'false' => 'false',
							'true' => 'true',
						),
						'other_choice' => 0,
						'save_other_choice' => 0,
						'default_value' => 'true',
						'layout' => 'vertical',
					),
					// LIMIT DESCRIPTION
					array (
						'key' => 'field_acf_fs_or_limit_description',
						'label' => __('Limit Description', 'futusign_overlayrss'),
						'name' => 'limit_description',
						'type' => 'radio',
						'instructions' => __('Set to true to limit the number of characters in description; false to show all of description', 'futusign_overlayrss'),
						'required' => 1,
						'choices' => array (
							'false' => 'false',
							'true' => 'true',
						),
						'other_choice' => 0,
						'save_other_choice' => 0,
						'default_value' => 'false',
						'layout' => 'vertical',
					),
					array (
						'key' => 'field_acf_fs_or_max_description',
						'label' => __('Maximum Description', 'futusign-overlayrss'),
						'name' => 'maximum_description',
						'type' => 'number',
						'instructions' => __('The maximum characters to show in description; minimum 1 character', 'futusign_overlayrss'),
						'required' => 1,
						'conditional_logic' => array (
							'status' => 1,
							'rules' => array (
								array (
									'field' => 'field_acf_fs_or_limit_description',
									'operator' => '==',
									'value' => 'true',
								),
							),
							'allorany' => 'all',
						),
						'default_value' => 1,
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'min' => 1,
						'max' => '',
						'step' => 1,
					),
					// PARSE
					array (
						'key' => 'field_acf_fs_or_title_parse',
						'label' => __('Title Parse', 'futusign_overlayrss'),
						'name' => 'title_parse',
						'type' => 'text',
						'instructions' => __('An advanced setting allowing you to parse the item\'s title for the matching and relevant content. Value needs to be a valid regular expression with a single capture; escape double-quotes', 'futusign-overlayrss'),
						'required' => 1,
						'default_value' => '^(?:<[^>]*>)*([^<]*)',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'formatting' => 'none',
						'maxlength' => '',
					),
					array (
						'key' => 'field_acf_fs_or_description_parse',
						'label' => __('Description Parse', 'futusign_overlayrss'),
						'name' => 'description_parse',
						'type' => 'text',
						'instructions' => __('An advanced setting allowing you to parse the item\'s description for the matching and relevant content. Value needs to be a valid regular expression with a single capture; escape double-quotes', 'futusign-overlayrss'),
						'required' => 1,
						'default_value' => '^(?:<[^>]*>)*([^<]*)',
						'placeholder' => '',
						'prepend' => '',
						'append' => '',
						'formatting' => 'none',
						'maxlength' => '',
					),
				),
				'location' => array (
					array (
						array (
							'param' => 'post_type',
							'operator' => '==',
							'value' => 'futusign_overlay_rss',
							'order_no' => 0,
							'group_no' => 0,
						),
					),
				),
				'options' => array (
					'position' => 'normal',
					'layout' => 'no_box',
					'hide_on_screen' => array (
						0 => 'permalink',
						1 => 'the_content',
						2 => 'excerpt',
						3 => 'discussion',
						4 => 'comments',
						5 => 'revisions',
						6 => 'slug',
						7 => 'author',
						8 => 'format',
						9 => 'featured_image',
						10 => 'categories',
						11 => 'tags',
						12 => 'send-trackbacks',
					),
				),
				'menu_order' => 0,
			));
		}
	}
	/**
	 * Create widget on publish
	 *
	 * @since    0.1.0
	 * @param    number    $ID            Id
	 * @param    string    $post          Post
	 */
	 public function publish( $ID, $post ) {
		$IDStr = strval( $ID );
		$new = true;
		$args = array(
			'post_type' => 'futusign_ov_widget',
			'posts_per_page' => -1,
		);
		$loop = new WP_Query( $args );
		while ( $loop->have_posts() ) {
			$loop->the_post();
			$loopID = get_the_ID();
			$loopRssIDStr = get_post_meta( $loopID, 'rssID', true );
			if ( $loopRssIDStr === $IDStr ) {
				$new = false;
			}
		}
		wp_reset_query();
		if ($new) {
			$widgetID = wp_insert_post(
				 array(
					 'post_type' => 'futusign_ov_widget',
					 'post_status' => 'publish',
					 'post_title' => 'RSS - '. get_the_title($post),
				 )
			 );
			 add_post_meta( $widgetID, 'rssID', strval($ID), true );
		 }
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
