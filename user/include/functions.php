<?php

function dbParse($database) {
    while($row = $database->fetch_assoc()){
        $arr[] = $row;
    }
    return $arr;
}

function redirect($url) {
    header('Location: ' . $url);
    exit();
}

function renderCard($id, $name, $price, $image, $description, $imgDir) {
    echo("
        <div class=\"card\">
        <input type=\"hidden\" class=\"product__id\" value=\"$id\">
            <header>
                <div class=\"card__image\">
                <img src=\"img/$imgDir/$image\" class=\"img__item\">
                </div>
                <h2 class=\"card__title\">$name</h2>
                <p class=\"card__description\">$description</p>
            </header>
            <footer class=\"card__footer\">
                <p class=\"card__price\">$price</p>
                <button class=\"card__add\">В&nbspкорзину</button>
            </footer>
        </div>");
}
