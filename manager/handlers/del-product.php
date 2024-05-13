<?php
require_once "../include/functions.php";

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$link->query("DELETE FROM `restaurant_menu_item` WHERE `id` = '{$_POST['id']}'");

redirect("/manager/products.php");