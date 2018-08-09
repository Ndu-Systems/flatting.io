<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";
$rows = array();
$result = $conn->prepare("SELECT * FROM payments");
$result->execute(array(
));
if ($result->rowCount() > 0) {
    while ($row = $result->fetch(PDO::FETCH_OBJ)) {
        $data = new Payment();
        $data->AmountInvoiced = $row->AmountInvoiced;
        $data->AmountPaid = $row->AmountPaid;
        $data->PaymentStatus = $row->PaymentStatus;

        $data->TenantId = $row->TenantId;
        $data->RoomId = $row->RoomId;

        $data-> getTenant($conn);
        $data-> getRoom($conn);
        $rows[] = $data;
    }
}
echo $json = json_encode($rows);

//classes 

class Payment
{
    public $ReferenceNumber;
    public $RoomId;
    public $RoomNumber;
    public $FirstName;
    public $TenantId;
    public $Surname;

    public $AmountInvoiced;
    public $AmountPaid;
    public $PaymentStatus;
    
    function getTenant($conn)
    {
        
        $result = $conn->prepare("SELECT * FROM tenant WHERE TenantId = ?");
        $result->execute(array(
            $this->TenantId
        ));
        if ($result->rowCount() > 0) {
            while ($row = $result->fetch(PDO::FETCH_OBJ)) {
                $this->FirstName = $row->FirstName;
                $this->Surname   = $row->Surname;
                $this->ReferenceNumber   = $row->ReferenceNumber;
            }
        }
    }
    function getRoom($conn)
    {
          
        $result = $conn->prepare("SELECT * FROM rooms WHERE RoomId = ?");
        $result->execute(array(
            $this->RoomId
        ));
        if ($result->rowCount() > 0) {
            while ($row = $result->fetch(PDO::FETCH_OBJ)) {
                $this->RoomNumber = $row->RoomNumber;
            }
        }
    }
}
?>