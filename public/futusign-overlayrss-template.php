<?php
if ( ! defined( 'WPINC' ) ) {
	die;
}
$fs_or_ID = get_the_ID();
// OUTPUT
header( 'Content-Type: text/html' );
header( 'Cache-Control: no-cache, no-store, must-revalidate');
?>
<!DOCTYPE html>
<html lang="en" manifest="<?php echo plugins_url( 'rss/dist/index.appcache', __FILE__ ); ?>">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>futusign Overlay RSS</title>
	<link href="<?php echo plugins_url( 'rss/dist/styles.79f529a4b93a1f37f3fca36fbf6560f6.css',  __FILE__  ); ?>" rel="stylesheet" />
</head>
<body>
	<div id="root"></div>
	<script>
    window.siteUrl = '<?php echo trailingslashit( site_url() ); ?>';
		window.fsOrID = "<?php echo $fs_or_ID; ?>";
	</script>
	<script src="<?php echo plugins_url( 'rss/dist/main.60c5190b2d54851e9d68.bundle.js',  __FILE__  ); ?>"></script>
</body>
</html>
