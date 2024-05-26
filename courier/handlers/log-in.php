<?php
require_once '../include/functions.php';

$link = mysqli_connect('localhost','root','','delivery');
mysqli_set_charset($link, 'utf-8');

$name = trim($_POST['username']);
$phone = trim($_POST['phone']);

if(strlen($phone) != 11 && strlen($name) < 2) {
    redirect('/courier/index.php');
}

$link->query("INSERT INTO `courier` (`first_name`, `phone`) VALUES ('$name', '$phone')");

$id = dbParse($link->query("SELECT `id` FROM `courier` WHERE `phone` = '$phone'"))[0]['id'];

setcookie('id', "$id", time() + 2678400 ,'/');

redirect("/courier/orders.php");

$link->close();