<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/<?=$file?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Freeman&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <title><?=$title?></title>
</head>
<body>
    <header class="header">
        <div class="logo"><a href="user.php" class="nav__link">superFood</a></div>
        <nav class="nav">
        <?php 
        if($title == 'Super Food') 
            echo('<ul class="nav__list">
                <li class="nav__item"><a href="#pizza__anchor" class="nav__link">pizza</a></li>
                <li class="nav__item"><a href="#sushi__anchor" class="nav__link">sushi</a></li>
                <li class="nav__item"><a href="#desserts__anchor" class="nav__link">desserts</a></li>
            </ul>');
        if($title == 'Super Food' || $title == 'Checkout') {
            echo("<a href=\"orders.php\" class=\"order__link\">My&nbsporders</a>");
        }
        ?>
        </nav>
        
    </header>
    
