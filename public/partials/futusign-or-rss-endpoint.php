<?php
/**
 * futusign or rss endpoint
 *
 * @link       https://github.com/larkintuckerllc
 * @since      0.6.0
 *
 * @package    futusign_overlayrss
 * @subpackage futusign_overlayrss/public/partials
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}
/**
 * futusign or rss endpoint
 *
 * @since    0.6.0
 */
function futusign_or_rss_endpoint($rss_url) {
  $pattern = '/^text\/xml/';
  $response = wp_remote_get( $rss_url );
  if ( is_array( $response ) ) {
    $header = $response['headers']; 
    $body = $response['body'];
    $content_type = $header['Content-Type'];
    $valid = preg_match($pattern, $content_type );
    if ( $valid !== 1 ) {
      status_header(400);
      return;
    }
    header( 'Content-Type: ' . $content_type );
    header( 'Cache-Control: no-cache, no-store, must-revalidate');
    echo $body;
  } else {
    status_header(400);
  }
}
