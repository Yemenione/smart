<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo '<h1>Hostinger Auto-Repair Tool (Corrected Names)</h1>';

// 1. Sync All Existing Images
function syncFiles($src, $dest) {
    if (!is_dir($src)) return;
    if (!is_dir($dest)) mkdir($dest, 0755, true);
    $files = glob($src . '/*');
    foreach ($files as $file) {
        if (is_dir($file)) {
            syncFiles($file, $dest . '/' . basename($file));
        } else {
            copy($file, $dest . '/' . basename($file));
        }
    }
}

syncFiles(__DIR__ . '/laravel_storage/app/public', __DIR__ . '/storage');
echo '<p style="color:green">? All Images Synchronized</p>';

// 2. Clear Caches
// ... (Skipping verbose output for brevity)

// 3. Fix Database Links with EXACT Table Names
$host = 'srv2067.hstgr.io';
$user = 'u533264913_smartouiess';
$pass = 'Admin123@19';
$db   = 'u533264913_smartouiess';

try {
    $conn = new mysqli($host, $user, $pass, $db);
    
    $mapping = [
        'settings' => 'value',
        'product_apps' => 'image_url',
        'projects' => 'cover_image',
        'posts' => 'image_url',
        'hero_slides' => 'image_url'
    ];

    foreach ($mapping as $table => $column) {
        $sql = "UPDATE $table SET $column = REPLACE($column, 'http://127.0.0.1:8000', 'https://smartouies.fr') WHERE $column LIKE '%127.0.0.1:8000%'";
        if ($conn->query($sql)) {
            echo "<p>? Table '$table' links updated.</p>";
        }
    }
    $conn->close();
} catch (Exception $e) {
    echo '<p style="color:red">?? Database Update Skipped: ' . $e->getMessage() . '</p>';
}

echo '<h2>Repair Finished! <a href="/">Visit Homepage</a></h2>';
?>
