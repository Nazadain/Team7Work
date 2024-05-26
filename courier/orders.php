<?php 
$title = "Заказы";
require_once 'include/header.php';
require_once 'include/functions.php';

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, 'utf-8');

$order = dbParse($link->query("SELECT * FROM `order`"));
$orderItem = dbParse($link->query("SELECT * FROM `order_item`"));
$menuItem = dbParse($link->query("SELECT * FROM `restaurant_menu_item`"));
$ordersData = ['order' => $order, 'orderItem' => $orderItem, 'menuItem' => $menuItem];
?>

<div class="container"></div>

<script>
    let dbData = <?=json_encode($ordersData)?>;
</script>

<script src="js/utils.js"></script>
<script src="js/script.js"></script>
<?php
require_once 'include/footer.php';
?>