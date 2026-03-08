<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/laravel_storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/vendor/autoload.php';

try {
    /** @var Application $app */
    $app = require_once __DIR__.'/bootstrap/app.php';

    $app->usePublicPath(__DIR__);
    $app->useStoragePath(__DIR__.'/laravel_storage');

    $app->handleRequest(Request::capture());
} catch (\Exception $e) {
    echo '<h1>Laravel Boot Error</h1>';
    echo '<p>' . $e->getMessage() . '</p>';
    echo '<pre>' . $e->getTraceAsString() . '</pre>';
}
?>
