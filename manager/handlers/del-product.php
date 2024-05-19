<?php
require_once "../include/functions.php";

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$link->query("SET foreign_key_checks = 0");
$link->query("DELETE FROM `restaurant_menu_item` WHERE `id` = '{$_POST['id']}'");
$link->query("SET foreign_key_checks = 1");

$link->close();

redirect("/manager/products.php");