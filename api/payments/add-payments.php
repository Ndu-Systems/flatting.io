<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data) ){  
    $payments= $data;
    $count = 0;
foreach($payments as $payment) {
    $result = $conn->prepare("INSERT INTO payments(TenantId, RoomId, BuildingId,ReferenceNumber, AmountInvoiced, AmountPaid, OutstandingAmount, PaymentMonth, PaymentYear, PaymentDate, StatusId,PaymentStatus) VALUES 
    (?,?,?,?,?,?,?,?,?,?,?,?)");

if($result->execute(array(
    $payment->TenantId,$payment->RoomId,$payment->BuildingId,$payment->ReferenceNumber,$payment->AmountInvoiced,$payment->AmountPaid,
    $payment->OutstandingAmount,$payment->PaymentMonth,$payment->PaymentYear,$payment->PaymentDate
    ,$payment->StatusId,$payment->PaymentStatus
))){	
    	$count = $count +1;	
}
else{
	echo json_encode("An error has occurred. please contact your system administrator.");
}
}
echo json_decode($count);

// }else{
	
// 	echo json_encode("Your account already exists, please go to login");
// } 
        
 
}
 else {

	echo json_encode( "500");
}
?>