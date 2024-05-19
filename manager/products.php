<?php
session_start();
$title = "Checkout";
$style = "products.css";
require_once "include/header.php";
require_once "include/functions.php";

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$customer = $_COOKIE['customer'];
$products = dbParse($link->query("SELECT * FROM `restaurant_menu_item`"));
?>
<div class="container">
    <button class="plus__item">Добавить товар</button>
    <h1>Products</h1>
    <main class="products__container">
    <?php
    foreach ($products as $key => $product) {
        echo ("
        <div class=\"product__item\">
            <form action=\"handlers/del-product.php\" method=\"POST\">
            <input type=\"hidden\" name=\"id\" value=\"{$product['id']}\">
            <button type=\"submit\" class=\"del\">X</button>
            </form>
            <h3>{$product['name']}</h3>
            <p class=\"info\">Цена: {$product['price']}</p>
            <p class=\"info\">Тип: {$product['type']}</p>
            <p class=\"info\">Изображение: {$product['image']}</p>
            <p class=\"info\">Описание: {$product['description']}</p>
        </div>
        ");
    }
    ?>
    </main>
    <form class="add__product" action="handlers/add-product.php" method="POST" enctype="multipart/form-data">
        <div class="close">X</div>
        <h2>Заполните форму</h2>
        <input type="text" name="name" placeholder="name">
        <input type="text" name="price" placeholder="price">
        <input type="text" name="desc" placeholder="description" id="desc">
        <p>тип:</p>
        <select name="type">
            <option value="pizza">пицца</option>
            <option value="sushi">роллы</option>
            <option value="dessert">дессерт</option>
        </select>
        <input type="file" name="file" id="desc">
        <input type="submit" class="add" value="Добавить товар">
    </form>
</div>

<?php 
require_once "include/footer.php";
?>
<script src="js/products.js"></script>