<?php
require_once '../include/functions.php';

$link = mysqli_connect('localhost','root','','delivery');
mysqli_set_charset($link, 'utf-8');

$link->query("UPDATE `order` SET `status` = 'в пути' WHERE `id` = '{$_POST['id']}'");

redirect("/kitchen/index.php");

$link->close();