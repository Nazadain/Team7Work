<?php
session_start();
$title = "Super Food";
require_once "blocks/header.php";
require_once "blocks/functions.php";
$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");
?>
<div class="cart__container"></div>
<div class="window__shadow"></div>
<div class="container">
    <div class="main__image"></div>
    <a name="pizza__anchor"></a>
    <div class="product__container pizza__container">
        <h1>Pizza</h1>
        <div class="cards">
            <?php
            $pizza_arr = dbParse($link->query("SELECT `name`, `price`, `image`, `description` FROM `restaurant_menu_item` WHERE `type` = 'pizza'"));
            for($i = 0; $i < count($pizza_arr); $i++) {
                $name = $pizza_arr[$i]["name"];
                $price = $pizza_arr[$i]["price"];
                $image = $pizza_arr[$i]["image"];
                $description = $pizza_arr[$i]["description"];
                echo("
                <div class=\"card\">
                    <img src=\"img/pizza/$image\">
                    <h2>$name</h2>
                    <p>$description</p>
                    <footer class=\"card__footer\">
                        <p class=\"price\">$price ₽</p>
                        <button class=\"buy\">Add&nbspto&nbspcart</button>
                    </footer>
                </div>");
            }
            ?>
        </div>
        
    </div>
    <a name="sushi__anchor"></a>
    <div class="product__container sushi__container">
        <h1>Sushi</h1>
        <div class="cards">
        <?php
            $sushi_arr = dbParse($link->query("SELECT `name`, `price`, `image`, `description` FROM `restaurant_menu_item` WHERE `type` = 'sushi'"));
            for($i = 0; $i < count($sushi_arr); $i++) {
                $name = $sushi_arr[$i]["name"];
                $price = $sushi_arr[$i]["price"];
                $image = $sushi_arr[$i]["image"];
                $description = $sushi_arr[$i]["description"];
                echo("
                <div class=\"card\">
                    <img src=\"img/sushi/$image\">
                    <h2>$name</h2>
                    <p>$description</p>
                    <footer class=\"card__footer\">
                        <p class=\"price\">$price ₽</p>
                        <button class=\"buy\">Add&nbspto&nbspcart</button>
                    </footer>
                </div>");
            }
            ?>
        </div>
    </div>
    <a name="desserts__anchor"></a>
    <div class="product__container desserts__container">
        <h1>Desserts</h1>
        <div class="cards">
        </div>
    </div>
</div>

<?php
require_once "blocks/footer.php";
?>