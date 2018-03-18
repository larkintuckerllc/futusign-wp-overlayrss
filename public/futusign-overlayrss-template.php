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
	$fs_or_limit_items = get_field('limit_items');
	$fs_or_maximum_items = get_field('maximum_items');
	$fs_or_publication_dates = get_field('publication_dates');
	$fs_or_maximum_age =  get_field('maximum_age');
	$fs_or_title = get_field('title');
	$fs_or_description = get_field('description');
	$fs_or_limit_description = get_field('limit_description');
	$fs_or_maximum_description = get_field('maximum_description');
	$fs_or_title_parse = get_field('title_parse', false, false);
	$fs_or_description_parse = get_field('description_parse', false, false);
}
wp_reset_query();
// OUTPUT
header( 'Content-Type: text/html' );
header( 'Cache-Control: no-cache, no-store, must-revalidate');
?>
<!DOCTYPE html>
<html lang="en" manifest="<?php echo plugins_url( 'rss/dist/index.appcache?version=2018031802', __FILE__ ); ?>">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>futusign Overlay RSS</title>
	<link href="<?php echo plugins_url( 'rss/dist/styles.79f529a4b93a1f37f3fca36fbf6560f6.css',  __FILE__  ); ?>" rel="stylesheet" />
</head>
<body>
	<div id="root"></div>
	<script>
		var fsOrURL = "<?php echo $fs_or_url; ?>";
		var fsOrCycling = <?php echo $fs_or_cycling ?>;
		var fsOrPolling = <?php echo $fs_or_polling ?>;
		var fsOrSize = <?php echo $fs_or_size ?>;
		var fsOrTheme = "<?php echo $fs_or_theme ?>";
		var fsOrLimitItems = <?php echo $fs_or_limit_items ?>;
		var fsOrMaximumItems = fsOrLimitItems ? Number("<?php echo $fs_or_maximum_items ?>") : null;
		var fsOrPublicationDates = <?php echo $fs_or_publication_dates ?>;
		var fsOrMaximumAge = fsOrPublicationDates ? Number("<?php echo $fs_or_maximum_age ?>") : null;
		var fsOrTitle = <?php echo $fs_or_title ?>;
		var fsOrDescription = <?php echo $fs_or_description ?>;
		var fsOrLimitDescription = <?php echo $fs_or_limit_description ?>;
		var fsOrMaximumDescription = fsOrLimitDescription ? Number("<?php echo $fs_or_maximum_description ?>") : null;
		var fsOrTitleParse = "<?php echo $fs_or_title_parse ?>";
		var fsOrDescriptionParse = "<?php echo $fs_or_description_parse ?>";
	</script>
	<script src="<?php echo plugins_url( 'rss/dist/main.cb69f2c284fac6433423.bundle.js',  __FILE__  ); ?>"></script>
</body>
</html>
