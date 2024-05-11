<?php
session_start();
$title = "Checkout";
$file = "orders.css";
require_once "include/header.php";
require_once "include/functions.php";

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$customer = $_COOKIE['customer'];
$order = dbParse($link->query("SELECT `status`, `date` FROM `order` WHERE `customer_id` = '$customer'"));
?>
<h1 class="header__text">My orders</h1>
<div class="container">
    <main class="orders__container">
        <?php
        if(isset($_COOKIE["customer"])) {
            foreach( $order as $key => $value ) {
                echo ("
                    <div class=\"order__item\">
                        <h3>Order #$key</h3>
                        <footer>
                            <p class=\"info\">Status: <span class=\"created\">{$value['status']}</span></p>
                            <p class=\"info\">Date: <span class=\"date\">{$value['date']}</span></p>
                        </footer>
                    </div>
                ");
            }
        }
        else {
            echo ("No Orders");
        }
            
        ?>
    </main>
</div>

<?php 
print_r($_COOKIE['customer']);
require_once "include/footer.php";
?>
<script src="js/orders.js"></script>