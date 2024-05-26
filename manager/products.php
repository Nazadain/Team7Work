<?php
session_start();
$title = "Товары";
$style = "products.css";
require_once "include/header.php";
require_once "include/functions.php";

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$customer = $_COOKIE['customer'];
$products = dbParse($link->query("SELECT * FROM `restaurant_menu_item`"));
?>
<div class="container">
    <button class="plus__item open__form-btn">Добавить товар</button>
    <h1>Products</h1>
    <main class="products__container">
    <?php
    foreach ($products as $key => $product) {
        echo ("
        <div class=\"product__item\" data-id=\"{$product['id']}\">
            <form action=\"handlers/del-product.php\" method=\"POST\">
            <input type=\"hidden\" name=\"id\" value=\"{$product['id']}\">
            <button type=\"submit\" class=\"del\">X</button>
            </form>
            <button class=\"edit open__form-btn\">/</button>
            <h3 class=\"product__name\">{$product['name']}</h3>
            <p class=\"info\">Цена: <span class=\"product__price\">{$product['price']}</span></p>
            <p class=\"info\">Тип: {$product['type']}</p>
            <p class=\"info\">Изображение: <span class=\"product__image\">{$product['image']}</span></p>
            <p class=\"info\">Описание: <span class=\"product__desc\">{$product['description']}</span></p>
        </div>
        ");
    }
    ?>
    </main>
    <form class="product__form edit__product" action="handlers/edit-product.php" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="id" class="data_id">
        <div class="close">X</div>
        <h2>Редактировать</h2>
        <input type="text" name="name" placeholder="name" class="name">
        <input type="text" name="price" placeholder="price" class="price">
        <input type="text" name="desc" placeholder="description" class="desc">
        <p>тип:</p>
        <select name="type">
            <option value="pizza">пицца</option>
            <option value="sushi">роллы</option>
            <option value="dessert">дессерт</option>
        </select>
        <input type="file" name="file" class="image">
        <input type="submit" class="add" value="Внести изменения">
    </form>
    <form class="product__form add__product" action="handlers/add-product.php" method="POST" enctype="multipart/form-data">
        <div class="close">X</div>
        <h2>Добавить товар</h2>
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