<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "conn.php";

$data = json_decode(file_get_contents("php://input"));

if(isset($data->Email)){
	
	$FirstName	= $data->FirstName;
	$Surname	= $data->Surname;
	$Email		= $data->Email;
	$ContactNumber = $data->ContactNumber;
	$NOKName	= $data->NOKName;
	$NOKNumber  = $data->NOKNumber;
	$WorkAddress = $data-> WorkAddress;
	$WorkTelephone = $data->WorkTelephone;
	$WorkName = $data->WorkName;
	$StatusId = 1;

	$result = $conn->prepare(
		"INSERT INTO tenant( FirstName, Surname, 
							  Email,ContactNumber, NOKName, 
							  NOKNumber, WorkAddress, WorkTelephone, 
							  WorkName, StatusId) VALUES (?,?,?,?,?,?,?,?,?,?)"
	);

	if($result->execute(array($FirstName,$Surname,$Email,$ContactNumber,$NOKName,$NOKNumber,$WorkAddress,$WorkTelephone,$WorkName,$StatusId))){
		echo 1;
	}
	else {
	     echo "Error: " . $conn . "<br>" . $result->error;
}

}
else{
	echo json_encode("500");
}

?>