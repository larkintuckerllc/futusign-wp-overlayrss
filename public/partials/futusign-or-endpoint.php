<?php
/**
 * futusign or endpoint
 *
 * @link       https://github.com/larkintuckerllc
 * @since      0.5.0
 *
 * @package    futusign_overlayrss
 * @subpackage futusign_overlayrss/public/partials
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}
/**
 * futusign or endpoint
 *
 * @since    0.5.0
 */
function futusign_or_endpoint($widget_id) {
  // RSS
  $rssID = get_post_meta( $widget_id, 'rssID', true );
  $args = array(
    'post_type' => 'futusign_overlay_rss',
    'posts_per_page' => -1,
    'page_id' => $rssID,
  );
  $loop = new WP_Query( $args );
  while ( $loop->have_posts() ) {
    $loop->the_post();
    $url = get_field('url');
    $cycling = get_field('cycling');
    $polling = get_field('polling');
    $size = get_field('size');
    $theme = get_field('theme');
    $limit_items = get_field('limit_items');
    $maximum_items = get_field('maximum_items');
    $publication_dates = get_field('publication_dates');
    $maximum_age =  get_field('maximum_age');
    $title = get_field('title');
    $description = get_field('description');
    $limit_description = get_field('limit_description');
    $maximum_description = get_field('maximum_description');
    $title_parse = get_field('title_parse', false, false);
    $description_parse = get_field('description_parse', false, false);
  }
  wp_reset_query();
  // OUTPUT
  header( 'Content-Type: application/json' );
  header( 'Cache-Control: no-cache, no-store, must-revalidate');
  echo '{';
  echo '"url":';
  echo json_encode( $url );
  echo ', "cycling":';
  echo json_encode( $cycling );
  echo ', "polling":';
  echo json_encode( $polling );
  echo ', "size":';
  echo json_encode( $size );
  echo ', "theme":';
  echo json_encode( $theme );
  echo ', "limitItems":';
  echo json_encode( $limit_items);
  echo ', "maximumItems":';
  echo json_encode( $maximium_items);
  echo ', "publicationDates":';
  echo json_encode( $publicationDates );
  echo ', "maximumAge":';
  echo json_encode( $maximum_age);
  echo ', "title":';
  echo json_encode( $title );
  echo ', "description":';
  echo json_encode( $description );
  echo ', "limitDescription":';
  echo json_encode( $limit_description );
  echo ', "maximumDescription":';
  echo json_encode( $maximum_description );
  echo ', "titleParse":';
  echo json_encode( $title_parse );
  echo ', "descriptionParse":';
  echo json_encode( $description_parse );
  echo '}';
}
