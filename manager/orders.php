<?php
session_start();
$title = "Checkout";
$style = "orders.css";
require_once "include/header.php";
require_once "include/functions.php";

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$customer = $_COOKIE['customer'];
$order = dbParse($link->query("SELECT * FROM `order`"));
?>
<div class="container">
    <h1>Orders</h1>
    <header class="header">
        <nav class="nav mb">
            <ul>
                <a href="#">all</a>
                <a href="#">new</a>
                <a href="#">active</a>
                <a href="#">closed</a>
            </ul>
        </nav>
    </header>
    <main class="orders__container">
        <?php
        if(!$order) {
            echo ("<h3>No orders</h3>");
            exit();
        } 
        foreach( $order as $key => $value ) {
            $customerId = $value['customer_id'];
            $orderId = $value['id'];
            $customerName = dbParse($link->query("SELECT `first_name` FROM `customer` WHERE `id` = '$customerId'"));
            $customerName = $customerName[0]["first_name"];
            echo ("
                <div class=\"order__item\">
                    <h3>Order&nbsp#$orderId</h3>
                    <footer>
                        <p class=\"info\">Status: <span class=\"created\">{$value['status']}</span></p>
                        <p class=\"info\">Date: <span class=\"date\">{$value['date']}</span></p>
                        <p class=\"info\">Customer name: <span class=\"date\">$customerName</span></p>
                        <form action=\"handlers/accept-order.php\" method=\"POST\" class=\"button__container\">
                            <input type=\"hidden\" value=\"$orderId\" name=\"id\">
                            <button class=\"decline\">Decline</button>
                            <button type\"submit\" class=\"accept\">Accept</button>
                        </form>
                    </footer>
                </div>
            ");
        }
        ?>
    </main>
</div>

<?php 
require_once "include/footer.php";
?>
<script src="js/orders.js"></script>