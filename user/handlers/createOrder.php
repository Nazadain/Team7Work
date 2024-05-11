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
$customerId = dbParse($link->query("SELECT `id` FROM `customer` WHERE `phone` = '$phone'"));
if($customerId == null) {
    $link->query("INSERT INTO `customer` (`first_name`, `second_name`, `phone`, `address`) VALUES ('$firstName', '$secondName', '$phone', '$address')");
}

$customerId = dbParse($link->query("SELECT `id` FROM `customer` WHERE `phone` = '$phone'"));
$customerId = (int)$customerId[0]['id'];

$date = date('20y-m-d h-i-s');
$link->query("INSERT INTO `order` (`customer_id`, `status`, `date`) VALUES ('$customerId', 'created', '$date')");
$orderId = dbParse($link->query("SELECT `id` FROM `order` ORDER BY `id` DESC LIMIT 0, 1 "));
$orderId = (int)$orderId[0]['id'];

foreach($cart as $key => $item) {
    $itemId = (int)$item['id'];
    $itemPrice = (int)$item['price'];
    $itemQuantity = (int)$item['quantity'];
    $link->query("INSERT INTO `order_item` (`order_id`, `restaurant_menu_item`, `price`, `quantity`) VALUES ('$orderId', '$itemId', '$itemPrice', '$itemQuantity')");
}

$link->close();
setcookie('customer', "$customerId", time() + 2678400 ,'/');
setcookie('cart', NULL, time()-3600, '/');
redirect('/user/orders.php');