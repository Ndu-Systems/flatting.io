<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data->BuildingName) ){  
    $BuildingId =  $data->BuildingId;
    $BuildingName =  $data->BuildingName; 
    $AddressLine1 =  $data->AddressLine1;  
    $AddressLine2 =  $data->AddressLine2;  
    $AddressLine3 =  $data->AddressLine3; 
    $City =  $data->City; 
    $PostCode =  $data->PostCode;  
    $ManagerId =  $data->ManagerId; 
    $StatusId =  $data->StatusId; 

$result = $conn->prepare("SELECT * FROM buildings WHERE BuildingId = ?"); 
$result->execute(array($BuildingId));
if ($result->rowCount() == 1) {

$result = $conn->prepare("
UPDATE  buildings 
SET   
BuildingName = ?,
AddressLine1 = ?,
AddressLine2 = ?,
AddressLine3 = ?,
City = ?,
PostCode = ?,
ManagerId = ?,
StatusId = ? 
WHERE BuildingId = ?
"); 
if($result->execute(array($BuildingName,$AddressLine1,$AddressLine2,$AddressLine3,$City,$PostCode, $ManagerId,$StatusId, $BuildingId))){
    echo 1;
}else{
	echo json_encode("error while trying to update details please try again");
}		
	
}else{
	
	echo json_encode("This Building Does Not Exist, Please Contact System Administrator");
}       
 
}
 else {

	echo json_encode( "500");
}
?>