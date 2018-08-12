<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";
$data = json_decode(file_get_contents("php://input"));

if (isset($data) ){  
    $invoices= $data;
    $count = 0;
foreach($invoices as $invoice) {
    $result = $conn->prepare("SELECT * FROM `invoice` WHERE ReferenceNumber =? AND Month = ?");
    $result->execute(array($invoice->ReferenceNumber,$invoice->Month));
    if($result->rowCount() > 0)
    $result = $conn->prepare("UPDATE invoice SET    
    ReferenceNumber=?,
    Amount=?,
    Month=?,
    Name=?,
    RoomId=?,
    StatusId=?,
    Balance=?
    WHERE InvoiceId=?");

if($result->execute(array(
    $invoice->ReferenceNumber,
    $invoice->Amount,
    $invoice->Month,
    $invoice->Name,
    $invoice->RoomId,
    $invoice->StatusId,
    $invoice->Balance,
    $invoice->InvoiceId,
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