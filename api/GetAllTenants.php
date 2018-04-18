<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "conn.php";
$data   = json_decode(file_get_contents("php://input"));
$rows   = array();

/* Get All Maintenances from the database */
$result =	$conn->prepare("SELECT * FROM tenant
							left join rooms on tenant.TenantId = rooms.TenantId
							left join roomtypes on rooms.RoomTypeId = roomtypes.RoomTypeId
							left join buildings on rooms.BuildingId = buildings.BuildingId
							left join statuses on tenant.StatusId = statuses.StatusId
							where tenant.TenantId = 1
							order by tenant.TenantId ");
$result -> execute(array());

/*Retrieve all the information for a maintenance */
if($result->rowCount()>0){
	while($row = $result->fetch(PDO::FETCH_OBJ)) {
		$rows["data"][]= $row;
	}
} 
echo json_encode($rows);
?>