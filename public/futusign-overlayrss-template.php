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
	$fs_or_url = get_field('url');
	$fs_or_cycling = get_field('cycling');
	$fs_or_polling = get_field('polling');
	$fs_or_size = get_field('size');
	$fs_or_theme = get_field('theme');
	$fs_or_publication_dates = get_field('publication_dates');
	$fs_or_maximum_age =  get_field('maximum_age');
	$fs_or_parse = get_field('parse');
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
	<script>
		var fsOrURL = "<?php echo $fs_or_url; ?>";
		var fsOrCycling = <?php echo $fs_or_cycling ?>;
		var fsOrPolling = <?php echo $fs_or_polling ?>;
		var fsOrSize = <?php echo $fs_or_size ?>;
		var fsOrTheme = "<?php echo $fs_or_theme ?>";
		var fsOrPublicationDates = <?php echo $fs_or_publication_dates ?>;
		var fsOrMaximumAge = fsOrPublicationDates ? Number("<?php echo $fs_or_maximum_age ?>") : null;
		var fsOrParse = "<?php echo $fs_or_parse ?>";
	</script>
</body>
</html>
