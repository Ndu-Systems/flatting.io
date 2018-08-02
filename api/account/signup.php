<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require "../conn.php";
$data = json_decode(file_get_contents("php://input"));

if(isset($data->Email)){

		$FirstName = $data->FirstName;
        $Surname = $data->Surname;
        $Email = $data->Email;
        $Password = $data->Password;
		$hashPassword = password_hash($Password, PASSWORD_DEFAULT);

		//Check if the User Exists
		$result = $conn->prepare("SELECT * FROM users WHERE Email = ?");
		$result->execute(array($Email));

		if($result->rowCount() == 0)
		{
			$result = $conn -> prepare("INSERT INTO `users`(`FirstName`, `Surname`, `Email`, `Password`, `Role`) 
										VALUES (?,?,?,?,?)");
			if($result->execute(array($FirstName,$Surname,$Email,$hashPassword,'Customer')))
			{
				echo 1;
			}
			else
			{
				echo json_encode("Error occurred contact system administrator");
			}
		}
		else
		{
			echo json_encode("Please Note That You Already Part Of The Family Please Sign In");			
		}
}
else{
	echo json_encode( "500");
}

?>