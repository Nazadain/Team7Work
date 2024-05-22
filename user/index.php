<?php
$title = "Super Food";
$file = "index.css";
require_once "include/header.php";
require_once "include/functions.php";
$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");
$pizzaArr = dbParse($link->query("SELECT `id`, `name`, `price`, `image`, `description` FROM `restaurant_menu_item` WHERE `type` = 'pizza'"));
$sushiArr = dbParse($link->query("SELECT `id`, `name`, `price`, `image`, `description` FROM `restaurant_menu_item` WHERE `type` = 'sushi'"));
$dessertArr = dbParse($link->query("SELECT `id`, `name`, `price`, `image`, `description` FROM `restaurant_menu_item` WHERE `type` = 'dessert'"));
?>
<a class="cart__link">
    <img src="img/cart.svg">
</a>

<div class="cart__container"></div>
<div class="window__shadow"></div>
<div class="container">
    <div class="main__image"></div>
    <a name="pizza__anchor"></a>
    <div class="product__container pizza__container">
        <h1>Пицца</h1>
        <div class="cards">
            <?php
            for($i = 0; $i < count($pizzaArr); $i++) {
                $id = $pizzaArr[$i]["id"];
                $name = $pizzaArr[$i]["name"];
                $price = $pizzaArr[$i]["price"];
                $image = $pizzaArr[$i]["image"];
                $description = $pizzaArr[$i]["description"];
                if($image == '') {
                    $image = 'pizza.svg';
                }
                renderCard($id, $name, $price, $image, $description);
            }
            ?>
        </div>
        
    </div>
    <a name="sushi__anchor"></a>
    <div class="product__container sushi__container">
        <h1>Роллы</h1>
        <div class="cards">
        <?php
        for($i = 0; $i < count($sushiArr); $i++) {
            $id = $sushiArr[$i]["id"];
            $name = $sushiArr[$i]["name"];
            $price = $sushiArr[$i]["price"];
            $image = $sushiArr[$i]["image"];
            $description = $sushiArr[$i]["description"];
            if($image == '') {
                $image = 'sushi.svg';
            }
            renderCard($id, $name, $price, $image, $description);
        }
        ?>
        </div>
    </div>
    <a name="desserts__anchor"></a>
    <div class="product__container desserts__container">
        <h1>Десерты</h1>
        <div class="cards">
        <?php
        for($i = 0; $i < count($dessertArr); $i++) {
            $id = $dessertArr[$i]["id"];
            $name = $dessertArr[$i]["name"];
            $price = $dessertArr[$i]["price"];
            $image = $dessertArr[$i]["image"];
            $description = $dessertArr[$i]["description"];
            if($image == '') {
                $image = 'dessert.svg';
            }
            renderCard($id, $name, $price, $image, $description);
        }
        ?>
        </div>
    </div>
</div>
<?php
$link->close();
require_once "include/footer.php";
?>
<script src="js/cart.js"></script>
