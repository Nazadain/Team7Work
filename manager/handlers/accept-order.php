<?php
require_once "../include/functions.php";

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$link->query("UPDATE `order` SET `status` = 'в обработке' WHERE `id` = '{$_POST['id']}'");

$link->close();

redirect("/manager/orders.php");