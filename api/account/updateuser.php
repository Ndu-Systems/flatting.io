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
		//Check if the User Exists
		$result = $conn->prepare("SELECT * FROM users WHERE Email = ?");
		$result->execute(array($Email));

		if($result->rowCount() > 0)
		{
			$result = $conn->prepare("
                        UPDATE users SET  
                        FirstName=?,
                        Surname=?                      
                        WHERE Email = ?
                    "); 
                    if($result->execute(array($FirstName,$Surname,$Email))){
                        echo 1;
                    }else{
                        echo json_encode("error while trying to update details please try again");
                    }
		}
		else
		{
			echo json_encode("Account Does not exist");			
		}
}
else{
	echo json_encode( "500");
}

?>