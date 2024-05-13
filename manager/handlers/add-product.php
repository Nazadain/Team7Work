<?php
require_once "../include/functions.php";

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");
print_r($_FILES["filename"]["tmp_name"]);

if( $_FILES['file']['name'] != "" ) {
    move_uploaded_file( $_FILES['file']['tmp_name'], __DIR__ . '/../../user/img/' . $_FILES['file']['name']) or die( "Could not copy file!");
}

// redirect("/manager/products.php");
