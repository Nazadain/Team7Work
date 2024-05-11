<?php
session_start();
$title = "Checkout";
$file = "checkout.css";
require_once "include/header.php";
?>
<div class="container">
    <header>
        <h1>Checkout</h1>
    </header>
    
    <main class="products__container">
    <form action="handlers/createOrder.php" method="post" class="form">
            <div class="form__row">
                <input type="text" name="firstname" placeholder="Name">
                <input type="text" name="secondname" placeholder="Second name">
            </div>
            <div class="form__row">
                <input type="text" name="phone" placeholder="Phone">
                <input type="text" name="address" placeholder="Address">
            </div>
            <div class="form__row">
                <input type="text" name="comment" placeholder="Comment(not necessary)" id="comment">
            </div>
            <div class="form__row alert"><?=$_SESSION['error']?></div>
        </form>
    </main>
</div>
<?php
require_once "include/footer.php";
?>
<script src="js/checkout.js"></script>
