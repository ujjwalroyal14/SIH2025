<?php

$server = "localhost";
$username = "root";  
$password = "";       
$database = "cattle_db"; 

// Create connection
$con = mysqli_connect($server, $username, $password, $dbname);

// Check connection
if(!$con)
{
    echo "not connected";
}
else 
{
    echo "connected";
}
?>



