<?php 
$title = "Заказы";
require_once 'include/header.php';
require_once 'include/functions.php';

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, 'utf-8');

$orders = dbParse($link->query("SELECT * FROM `order`"));

?>


<script>
    let orders = <?=json_encode($orders)?>
</script>
<?php

require_once 'include/footer.php';

?>