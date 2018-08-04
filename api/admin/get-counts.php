<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";
$data = json_decode(file_get_contents("php://input"));

$rows = array();
//students
$result = $conn->prepare("SELECT * FROM tenant WHERE StatusId = ?"); 
$result->execute(array(1));

$counts = new Counts();
$counts->key ="tenants";
$counts->value =$result->rowCount() ;
$rows[]= $counts;
//buildings
$result = $conn->prepare("SELECT * FROM buildings WHERE StatusId = ?"); 
$result->execute(array(1));

$counts = new Counts();
$counts->key ="buildings";
$counts->value =$result->rowCount() ;
$rows[]= $counts;



echo json_encode($rows);

?>
  <?php
        class Counts {
            public $key ;
            public $value;
          }
          
        ?>
