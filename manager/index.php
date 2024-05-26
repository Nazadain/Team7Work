<?php
session_start();
$title = "Заказы";
$style = "orders.css";
require_once "include/header.php";
require_once "include/functions.php";

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$customer = $_COOKIE['customer'];
$order = dbParse($link->query("SELECT * FROM `order`"));
?>
<div class="container">
    <h1>Заказы</h1>
    <main class="orders__container">
        <?php
        if(!$order) {
            echo ("<p>Заказов нет</p>");
            exit();
        } 
        foreach( $order as $key => $value ) {
            $customerName = dbParse($link->query("SELECT `first_name` FROM `customer` WHERE `id` = '{$value['customer_id']}'"))[0]['first_name'];
            if($value['courier_id'] != null) {
                $courierName = dbParse($link->query("SELECT `first_name` FROM `courier` WHERE `id` = '{$value['courier_id']}'"))[0]['first_name'];
            }
            echo ("
                <div class=\"order__item\">
                    <h3>Order&nbsp#{$value['id']}</h3>
                    <footer>
                        <p class=\"info\">Status:<br> <span class=\"created\">{$value['status']}</span></p>
                        <p class=\"info\">Date:<br> <span class=\"date\">{$value['date']}</span></p>
                        <p class=\"info\">Customer name:<br> <span class=\"date\">$customerName</span></p>
                        <p class=\"info\">Comment:<br> <span class=\"date\">{$value['comment']}</span></p>
            ");
            if($value['status'] == 'создан') {
                echo ("
                <form action=\"handlers/accept-order.php\" method=\"POST\" class=\"button__container\">
                <input type=\"hidden\" value=\"{$value['id']}\" name=\"id\">
                <button type\"submit\" class=\"accept\">Accept</button>
                </form>
            ");}      
            echo ("
            </footer>
            </div>
            ");}
        ?>
    </main>
</div>

<?php 
$link->close();
require_once "include/footer.php";
?>
<script src="js/orders.js"></script>