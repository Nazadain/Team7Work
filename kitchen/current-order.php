<?php
$style = 'current-order.css';

require_once 'include/header.php';
require_once 'include/functions.php';

$link = mysqli_connect('localhost','root','','delivery');
mysqli_set_charset($link, 'utf-8');

$link->
query("UPDATE `order` SET `status` = 'на кухне' WHERE `id` = '{$_GET['id']}'");

$order = 
dbParse($link->
query("SELECT `id`, `status`, `courier_id` FROM `order` WHERE `id` = '{$_GET['id']}'"));

$orderItems = 
dbParse($link->
query("SELECT * FROM `order_item` WHERE `order_id` = '{$_GET['id']}'"));

$courierName = 
dbParse($link->
query("SELECT `first_name` FROM `courier` WHERE `id` = '{$order[0]['courier_id']}'"))[0]['first_name'];

$menuItem = [];

for($i = 0; $i < count($orderItems); $i++)
{
    $menuItem[$i] = 
    dbParse($link->
    query("SELECT `name` FROM `restaurant_menu_item` 
    WHERE `id` = '{$orderItems[$i]['restaurant_menu_item']}'"
    ));
}
?>

<div class="order__container">
    <?php
    echo "<h1>Заказ №{$order[0]['id']}</h1><br>";
    ?>
    <h3>Блюда:<br></h3>
    <?php
    for($i = 0; $i < count($menuItem); $i++)
    {
        echo("<p>{$menuItem[$i][0]['name']} ({$orderItems[$i]['quantity']})</p>");
    }

    if($courierName) 
    {
        echo("<p>Курьер: {$courierName}</p>");
        echo("
            <form action=\"handlers/give-order.php\" method=\"POST\">
                <input type=\"hidden\" name=\"id\" value=\"{$order[0]['id']}\">
            <button type=\"submit\">Передать заказ</button>
            </form>
        ");
    }else
    {
        echo("<p>Курьер: нет</p>");
    }

    ?>
    
</div>

<?php
$link->close();
require_once 'include/footer.php';
?>