<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data->ReferenceNumber) ){  
$TenantId=  $data->TenantId;
$RoomId=  $data->RoomId;
$BuildingId=  $data->BuildingId;
$ReferenceNumber=  $data->ReferenceNumber;
$AmountInvoiced=  $data->AmountInvoiced;
$AmountPaid=  $data->AmountPaid;
$OutstandingAmount=  $data->OutstandingAmount;
$PaymentMonth=  $data->PaymentMonth;
$PaymentYear=  $data->PaymentYear;
$PaymentDate=  $data->PaymentDate;
$StatusId=  $data->StatusId;
$PaymentStatus=  $data->PaymentStatus;
$PaymentId =  $data->PaymentId;
     

$result = $conn->prepare("SELECT * FROM payments WHERE PaymentId = ?"); 
$result->execute(array($PaymentId));
if ($result->rowCount() == 1) {

$result = $conn->prepare("
UPDATE payments 
SET 
TenantId=?,
RoomId=?,
BuildingId=?,
ReferenceNumber=?,
AmountInvoiced=?,
AmountPaid=?,
OutstandingAmount=?,
PaymentMonth=?,
PaymentYear=?,
PaymentDate=?,
StatusId=?,
PaymentStatus=?
WHERE PaymentId = ?
"); 
if($result->execute(array(
    $TenantId,
    $RoomId,
    $BuildingId,
    $ReferenceNumber,
    $AmountInvoiced,
    $AmountPaid,
    $OutstandingAmount,
    $PaymentMonth,
    $PaymentYear,
    $PaymentDate,
    $StatusId,
    $PaymentStatus,
    $PaymentId
))){
    echo 1;
}else{
	echo json_encode("error while trying to update details please try again");
}		
	
}else{
	
	echo json_encode("This Payment Does Not Exist, Please Contact System Administrator");
}     
 
}
 else {

	echo json_encode( "500");
}
?>