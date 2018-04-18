<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "conn.php";
$data   = json_decode(file_get_contents("php://input"));
$rows   = array();

/* Get All Maintenances from the database */
$result =	$conn->prepare("SELECT * FROM maintenance
							left join tenant on maintenance.TenantId = tenant.TenantId
							left join rooms on maintenance.RoomId = rooms.RoomId
							left join buildings on maintenance.BuildingId = buildings.BuildingId
							left join staff on maintenance.StaffId = staff.StaffId
							left join logs on maintenance.LogId = logs.LogId
							left join statuses on maintenance.StatusId = statuses.StatusId
							where maintenance.StatusId = 1
							order by maintenance.LogDate");
$result -> execute(array());

/*Retrieve all the information for a maintenance */
if($result->rowCount()>0){
	while($row = $result->fetch(PDO::FETCH_OBJ)) {
		$rows["data"][]= $row;
	}
} 
echo json_encode($rows);
?>