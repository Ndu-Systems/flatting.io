<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";
$data = json_decode(file_get_contents("php://input"));
if (isset($data) ){ 
    $PaymentMonth = $data->PaymentMonth;
    $ReferenceNumber = $data->ReferenceNumber;
    $rows = array();

  $result = $conn->prepare("SELECT * FROM payments p WHERE 
  p.OutstandingAmount > 0 
  AND p.PaymentMonth = ? 
  AND p.PaymentStatus = 'incomplete' 
  AND p.ReferenceNumber = ?");

  $result->execute(array( $PaymentMonth, $ReferenceNumber ));
  $payment = $result->fetch(PDO::FETCH_ASSOC);

  if($payment)
  {      
    echo json_encode($payment);         
  }
  else
  {
	  echo json_encode("Error Occurred");
  }
}
  else {

	echo json_encode( "500");
}
?>

