<?php
session_start();
$title = "Checkout";
$file = "orders.css";
require_once "include/header.php";
require_once "include/functions.php";

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$customer = $_COOKIE['customer'];
$order = dbParse($link->query("SELECT `id`, `status`, `date` FROM `order` WHERE `customer_id` = '$customer'"));

?>
<h1 class="header__text">Мои заказы</h1>
<div class="container">
    <main class="orders__container">
        <?php
        if(isset($_COOKIE["customer"])) {
            foreach( $order as $key => $value ) {
                $orderId = $value["id"];
                echo ("
                    <div class=\"order__item\">
                        <h3>Заказ #$orderId</h3>
                        <footer>
                            <p class=\"info\">Статус: <span class=\"created\">{$value['status']}</span></p>
                            <p class=\"info\">Дата: <span class=\"date\">{$value['date']}</span></p>
                        </footer>
                    </div>
                ");
            }
        }   
        ?>
    </main>
</div>

<?php 
require_once "include/footer.php";
?>
<script src="js/orders.js"></script>