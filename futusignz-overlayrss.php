<?php
/**
 * The plugin bootstrap file
 *
 * @link             https://bitbucket.org/futusign/futusign-wp-overlayrss
 * @since            0.1.0
 * @package          futusign_overlayrss
 * @wordpress-plugin
 * Plugin Name:      futusign Overlay RSS
 * Plugin URI:       https://www.futusign.com
 * Description:      Add futusign Overlay RSS feature
 * Version:          0.2.1
 * Author:           John Tucker
 * Author URI:       https://github.com/larkintuckerllc
 * License:          Custom
 * License URI:      https://www.futusign.com/license
 * Text Domain:      futusign-overlayrss
 * Domain Path:      /languages
 */
if ( ! defined( 'WPINC' ) ) {
	die;
}
//Use version 3.1 of the update checker.
require 'plugin-update-checker/plugin-update-checker.php';
$MyUpdateChecker = new PluginUpdateChecker_3_1 (
	'http://futusign-wordpress.s3-website-us-east-1.amazonaws.com/futusignz-overlayrss.json',
	__FILE__
);
function activate_futusign_overlayrss() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-futusign-overlayrss-activator.php';
	Futusign_OverlayRSS_Activator::activate();
}
function deactivate_futusign_overlayrss() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-futusign-overlayrss-deactivator.php';
	Futusign_OverlayRSS_Deactivator::deactivate();
}
register_activation_hook( __FILE__, 'activate_futusign_overlayrss' );
register_deactivation_hook( __FILE__, 'deactivate_futusign_overlayrss' );
require_once plugin_dir_path( __FILE__ ) . 'includes/class-futusign-overlayrss.php';
/**
 * Begins execution of the plugin.
 *
 * @since    0.1.0
 */
function run_futusign_overlayrss() {
	$plugin = new Futusign_OverlayRSS();
	$plugin->run();
}
run_futusign_overlayrss();
