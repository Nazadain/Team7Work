<?php
session_start();
require_once "../include/functions.php";
$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$firstName = trim($_POST['firstname']);
$secondName = trim($_POST['secondname']);
$phone = trim($_POST['phone']);
$address = trim($_POST['address']);
$comment = trim($_POST['comment']);

$cart = json_decode($_COOKIE['cart'], true);

if(strlen($firstName) <= 0 || strlen($secondName) <= 0 || strlen($address) <= 0 || strlen($phone) != 11){
    $_SESSION['error'] = 'Введите корректные данные';
    redirect('/order.php');
    exit();
}
else {
    $_SESSION['error'] = '';
}
 

$link->query("INSERT INTO `customer` (`first_name`, `second_name`, `phone`, `address`) VALUES ('$firstName', '$secondName', '$phone', '$address')");
$customerId = dbParse($link->query("SELECT `id` FROM `customer` WHERE `phone` = '$phone'"));
$date = date('20y-m-d h-i-s');
$link->query("INSERT INTO `order` (`customer_id`, `status`, `date`) VALUES ('{$customerId[0]['id']}', 'created', '$date')");

$orderId = dbParse($link->query("SELECT `id` FROM `order` WHERE `customer_id` = '$customerId' AND `status` = 'created'"));

foreach($cart as $key => $item) {
    $itemId = (int)$item['id'];
    $itemPrice = (int)$item['price'];
    $itemQuantity = (int)$item['quantity'];
    $link->query("INSERT INTO `order_item` (`order_id`, `restaurant_menu_item`, `price`, `quantity`) VALUES ('$orderId', '$itemId', '$itemPrice', '$itemQuantity')");
    print_r($itemId . " " . $itemPrice . " " . $itemQuantity . " | ");
}

$link->close();

setcookie('cart', NULL, time()-3600, '/');
redirect('/index.php');