<?php
require_once '../include/functions.php';

$link = mysqli_connect('localhost','root','','delivery');
mysqli_set_charset($link, 'utf-8');

$link->query("UPDATE `order` SET `status` = 'закрыт' WHERE `id` = '{$_POST['id']}'");

redirect("/courier/orders.php");

$link->close();