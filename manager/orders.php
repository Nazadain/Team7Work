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
$customerName = dbParse($link->query("SELECT `first_name` FROM `customer` WHERE `id` = '$customer'"));
$customerName = $customerName[0]["first_name"];
?>
<div class="container">
    <h1>Orders</h1>
    <main class="orders__container">
        <?php
            foreach( $order as $key => $value ) {
                echo ("
                    <div class=\"order__item\">
                        <h3>Order #$key</h3>
                        <footer>
                            <p class=\"info\">Status: <span class=\"created\">{$value['status']}</span></p>
                            <p class=\"info\">Date: <span class=\"date\">{$value['date']}</span></p>
                            <p class=\"info\">Customer name: <span class=\"date\">$customerName</span></p>
                            <div class=\"button__container\">
                                <button class=\"accept\">Accept</button>
                                <button class=\"decline\">Decline</button>
                            </div>
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