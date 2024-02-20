<?php

$server = "lsql109.infinityfree.com";
$username = "yif0_36013171";
$password = "Sharko2552";
$dbname = "if0_36013171_markoswebdesign";

$conn = mysqli_connect($server, $username, $password, $dbname);

if(!$conn){
    die("Connection failed: " . mysqli_connect_error());
}

?>
