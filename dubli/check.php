<?php
echo '<h1>Server Requirement Check</h1>';
echo 'PHP Version: ' . PHP_VERSION . (version_compare(PHP_VERSION, '8.2.0', '>=') ? ' ?' : ' ? (Need 8.2+)');

$extensions = ['intl', 'bcmath', 'mbstring', 'xml', 'ctype', 'openssl', 'pdo_mysql'];
foreach ($extensions as $ext) {
    echo '<p>Extension ' . $ext . ': ' . (extension_loaded($ext) ? '?' : '?') . '</p>';
}

echo '<h2>Database Status</h2>';
$host = 'srv2067.hstgr.io';
$user = 'u533264913_smartouiess';
$pass = 'Admin123@19';
$db   = 'u533264913_smartouiess';

try {
    $conn = new mysqli($host, $user, $pass, $db);
    echo '<p style="color:green">? Database Connection is ACTIVE and Working!</p>';
    $conn->close();
} catch (Exception $e) {
    echo '<p style="color:red">? Database Error: ' . $e->getMessage() . '</p>';
    if (str_contains($e->getMessage(), 'max_connections_per_hour')) {
        echo '<p><b>STILL BLOCKED:</b> You must wait 30 minutes for Hostinger to reset your limit.</p>';
    }
}
?>
