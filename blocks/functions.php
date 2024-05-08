<?php

function dbParse($database) {
    while($row = $database->fetch_assoc()){
        $arr[] = $row;
    }
    return $arr;
}

function renderCard($id, $name, $price, $image, $description, $imgDir) {
    echo("
        <div class=\"card\">
        <input type=\"hidden\" name=\"product__id\" value=\"$id\">
            <header>
                <img src=\"img/$imgDir/$image\">
                <h2>$name</h2>
                <p class=\"card__description\">$description</p>
            </header>
            <footer class=\"card__footer\">
                <p class=\"price\">$price ₽</p>
                <button class=\"buy\">Add&nbspto&nbspcart</button>
            </footer>
        </div>"
    );
}
