<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data->Email) ){  
 $Email 	= $data->Email;
 $FirstName 	= $data->FirstName;
 $Surname 	= $data->Surname;
 $ContactNumber 	= $data->ContactNumber;
 $WorkAddress 	= $data->WorkAddress;
 $WorkTelephone 	= $data->WorkTelephone;
 $WorkName 	= $data->WorkName;
 $TenantId = $data->TenantId;
 $StatusId = $data->StatusId;

$result = $conn->prepare("SELECT * FROM tenant WHERE Email = ?"); 
$result->execute(array($Email));
if ($result->rowCount() == 1) {

$result = $conn->prepare("
UPDATE  tenant  SET  
FirstName = ?,
Surname = ?,
Email = ?,
ContactNumber = ?, 
WorkAddress = ?,
WorkTelephone = ?,
WorkName = ? ,
StatusId = ? 
WHERE TenantId = ?
"); 
if($result->execute(array($FirstName,$Surname,$Email,$ContactNumber,$WorkAddress,$WorkTelephone, $WorkName,$StatusId, $TenantId))){
    echo 1;
}else{
	echo json_encode("error while trying to update details please try again");
}		

	
}else{
	
	echo json_encode("This Tenant Does Not Exist, Please Contact System Administrator");
}       
 
}
 else {

	echo json_encode( "500");
}
?>