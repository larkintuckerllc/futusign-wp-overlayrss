<?php
/**
 * Missing futusign plugin partial.
 *
 * @link       https://bitbucket.org/futusign/futusign-wp-overlayrss
 * @since      0.1.0
 *
 * @package    futusign_overlayrss
 * @subpackage inactive/partials
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}
$is_installed = Futusign_OverlayRSS::is_plugin_installed( 'futusign' );
$target = false;
$action = __('Install', 'futusign_overlayrss');
if ( current_user_can( 'install_plugins' ) ) {
	if ( $is_installed ) {
		$action = __('Activate', 'futusign_overlayrss');
		$url = wp_nonce_url( self_admin_url( 'plugins.php?action=activate&plugin=' . $is_installed . '&plugin_status=active' ), 'activate-plugin_' . $is_installed );
	} else {
		$url = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=futusign' ), 'install-plugin_futusign' );
	}
} else {
	$target = true;
	$url = 'http://wordpress.org/plugins/futusign/';
}
?>
<div class="notice error is-dismissible">
	<p><strong>futusign Overlay RSS</strong> <?php esc_html_e('depends on the last version of futusign to work!', 'futusign_overlayrss' ); ?></p>
	<p><a href="<?php echo esc_url( $url ); ?>" class="button button-primary"<?php if ( $target ) : ?> target="_blank"<?php endif; ?>><?php echo esc_html( $action . ' futusign' ); ?></a></p>
</div>
