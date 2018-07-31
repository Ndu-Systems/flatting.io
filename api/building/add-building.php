<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data->BuildingName) ){  
  
    $BuildingName =  $data->BuildingName; 
    $AddressLine1 =  $data->AddressLine1;  
    $AddressLine2 =  $data->AddressLine2;  
    $AddressLine3 =  $data->AddressLine3; 
    $City =  $data->City; 
    $PostCode =  $data->PostCode;  
  

$result = $conn->prepare("SELECT * FROM buildings WHERE BuildingName =?"); 
$result->execute(array($BuildingName));
if ($result->rowCount() == 0) {
$result = $conn->prepare("INSERT INTO  buildings ( BuildingName ,  AddressLine1 ,  AddressLine2 ,  AddressLine3 ,  City ,  PostCode ,  ManagerId ,  StatusId ) 
VALUES (?,?,?,?,?,?,?,?)"); 
if($result->execute(array($BuildingName,$AddressLine1,$AddressLine2,$AddressLine3,$City,$PostCode, 1,1))){
    echo 1;
}else{
	echo json_encode("error while trying to update details please try again");
}		
	
}else{
	
	echo json_encode("This Building Already Exist, Please Contact System Administrator");
}       
 
}
 else {

	echo json_encode( "500");
}
?>