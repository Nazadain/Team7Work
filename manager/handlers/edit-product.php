<?php

require_once '../include/functions.php';

$link = mysqli_connect('localhost', 'root', '', 'delivery');
mysqli_set_charset($link, "utf8");

$productId = $_POST['id'];
$productName = $_POST['name'];
$productPrice = $_POST['price'];
$productDesc = $_POST['desc'];
$productType = $_POST['type'];
$productImage = $_FILES['file']['name'];

if($productImage) {
    try {
        if (
            !isset($_FILES['file']['error']) ||
            is_array($_FILES['file']['error'])
        ) {
            throw new RuntimeException('Invalid parameters.');
        }
    
        switch ($_FILES['file']['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                throw new RuntimeException('No file sent.');
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                throw new RuntimeException('Exceeded filesize limit.');
            default:
                throw new RuntimeException('Unknown errors.');
        }
        if ($_FILES['file']['size'] > 100000000) {
            throw new RuntimeException('Exceeded filesize limit.');
        }
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        if (false === $ext = array_search(
            $finfo->file($_FILES['file']['tmp_name']),
            array(
                'jpg' => 'image/jpeg',
                'png' => 'image/png',
                'svg' => 'image/svg',
                'gif' => 'image/gif',
                'webp' => 'image/webp',
            ),
            true
        )) {
            throw new RuntimeException('Invalid file format.');
        }
    
        $path = __DIR__ . '/../../user/img/' . $_FILES['file']['name'];
    
        move_uploaded_file( $_FILES['file']['tmp_name'], $path) or die( "Could not copy file!");
    
    } catch (RuntimeException $error) {
    
        echo $error->getMessage();
    
    }
}

$link->query("UPDATE `restaurant_menu_item` SET (`name`, `price`, `type`, `image`, `description`) = 
('$productName', '$productPrice', '$productType', '$productImage', '$productDesc') WHERE `id` = '$productId'");

if($productName)
{
    $link->query("UPDATE `restaurant_menu_item` SET `name` = '$productName' WHERE `id` = '$productId'");
}

if($productPrice)
{
    $link->query("UPDATE `restaurant_menu_item` SET `price` = '$productPrice' WHERE `id` = '$productId'");
}

if($productDesc)
{
    $link->query("UPDATE `restaurant_menu_item` SET `description` = '$productDesc' WHERE `id` = '$productId'");
}

if($productImage)
{
    $link->query("UPDATE `restaurant_menu_item` SET `image` = '$productImage' WHERE `id` = '$productId'");
}

$link->query("UPDATE `restaurant_menu_item` SET `type` = '$productType' WHERE `id` = '$productId'");


$link->close();

redirect("/manager/products.php");