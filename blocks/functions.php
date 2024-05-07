<?php

function dbParse($database) {
    while($row = $database->fetch_assoc()){
        $arr[] = $row;
    }
    return $arr;
}