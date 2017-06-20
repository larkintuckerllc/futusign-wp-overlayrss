<?php
if ( ! defined( 'WPINC' ) ) {
	die;
}
$fs_or_ID = get_the_ID();
$fs_or_rssID = get_post_meta( $fs_or_ID, 'rssID', true );
$fs_or_args = array(
	'post_type' => 'futusign_overlay_rss',
	'posts_per_page' => -1,
	'page_id' => $fs_or_rssID,
);
$fs_or_loop = new WP_Query( $fs_or_args );
while ( $fs_or_loop->have_posts() ) {
	$fs_or_loop->the_post();
	// TODO: GET ADV CUST
	$fs_or_title = get_the_title();
}
wp_reset_query();
// OUTPUT
header( 'Content-Type: text/html' );
header( 'Cache-Control: no-cache, no-store, must-revalidate');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>futusign Overlay RSS</title>
</head>
<body>
	<?php echo $fs_or_title; ?>
</body>
</html>
