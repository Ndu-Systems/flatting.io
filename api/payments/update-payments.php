
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
    $result = $conn->prepare("SELECT * FROM payments WHERE ReferenceNumber =? AND PaymentMonth = ?");
    $result->execute(array($payment->ReferenceNumber,$payment->PaymentMonth));
    if($result->rowCount() > 0)
    $result = $conn->prepare("UPDATE payments SET    
        TenantId=?,
        RoomId=?,
        BuildingId=?,
        AmountInvoiced=?,
        AmountPaid=?,
        OutstandingAmount=?,
        PaymentMonth=?,
        PaymentYear=?,
        PaymentDate=?,
        StatusId=?,
        PaymentStatus=?,
        ReferenceNumber=?
    WHERE PaymentId=?");

if($result->execute(array(
    $payment->TenantId,
    $payment->RoomId,
    $payment->BuildingId,
    $payment->AmountInvoiced,
    $payment->AmountPaid,
    $payment->OutstandingAmount,
    $payment->PaymentMonth,
    $payment->PaymentYear,
    $payment->PaymentDate,
    $payment->StatusId,
    $payment->PaymentStatus,
    $payment->ReferenceNumber,
    $payment->PaymentId
 
))){	
        // save history
        $saveHistory =  $conn->prepare("INSERT INTO paymentshistory(PaymentId,TenantId, RoomId, BuildingId,ReferenceNumber, AmountInvoiced, AmountPaid, OutstandingAmount, PaymentMonth, PaymentYear, PaymentDate, StatusId,PaymentStatus,Createdate) VALUES 
        (?,?,?,?,?,?,?,?,?,?,?,?,?,now())");
        $saveHistory->execute(array(
            $payment->PaymentId,
            $payment->TenantId,$payment->RoomId,$payment->BuildingId,$payment->ReferenceNumber,$payment->AmountInvoiced,$payment->AmountPaid,
            $payment->OutstandingAmount,$payment->PaymentMonth,$payment->PaymentYear,$payment->PaymentDate
            ,$payment->StatusId,$payment->PaymentStatus
        ));

        //end save history
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