<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$conn = new mysqli('srv2067.hstgr.io', 'u533264913_smartouiess', 'Admin123@19', 'u533264913_smartouiess');
if ($conn->connect_error) {
    die('<h1>? Connection Failed</h1><p>' . $conn->connect_error . '</p>');
}
echo '<h1>? Connection Successful!</h1>';
$conn->close();
?>
