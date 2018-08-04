<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";

$statement = $conn->prepare("SELECT * FROM payments");
$statement->execute();
$results = $statement->fetchAll(PDO::FETCH_ASSOC);
echo $json = json_encode($results);
?>