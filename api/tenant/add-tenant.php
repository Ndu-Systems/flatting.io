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
 $NOKName = $data->NOKName;
 $NOKNumber = $data->NOKNumber;
 $StatusId = 1;

$result = $conn->prepare("SELECT * FROM tenant WHERE Email = ?"); 
$result->execute(array($Email));
if ($result->rowCount() == 0) {

$result = $conn->prepare("
INSERT INTO  tenant (  FirstName ,  Surname ,  Email ,  ContactNumber ,  NOKName ,  NOKNumber ,  WorkAddress ,  WorkTelephone ,  WorkName ,  StatusId ) 
VALUES ( ?,?,?,?,?,?,?,?,?,?)
"); 
if($result->execute(array($FirstName,$Surname,$Email,$ContactNumber,$NOKName,$NOKNumber,$WorkAddress,$WorkTelephone, $WorkName ,$StatusId ))){
    echo 1;
}else{
	echo json_encode("error while trying create tenant, please try again");
}		

	
}else{
	
	echo json_encode("This Tenant Already Exist In The System, Please Contact System Administrator");
}       
 
}
 else {

	echo json_encode( "500");
}
?>