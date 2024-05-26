<?php 
$title = "Заказы";
require_once 'include/header.php';
require_once 'include/functions.php';

if(isset($_COOKIE['id'])) {
    redirect('/courier/order.php');
}

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, 'utf-8');

$order = dbParse($link->query("SELECT * FROM `order`"));
$orderItem = dbParse($link->query("SELECT * FROM `order_item`"));
$menuItem = dbParse($link->query("SELECT * FROM `restaurant_menu_item`"));
$ordersData = ['order' => $order, 'orderItem' => $orderItem, 'menuItem' => $menuItem];
?>

<div class="container form__container">
    <form action="handlers/log-in.php" method="POST">
        <input type="text" name="username" placeholder="Имя">
        <input type="text" name="phone" placeholder="Номер телефона">
        <input type="submit" value="Войти">
    </form>
</div>


<?php
require_once 'include/footer.php';
?>