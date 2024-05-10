<?php
$title = "Checkout";
$file = "order.css";
require_once "include/header.php";
?>
<div class="container">
    <header>
        <h1>Checkout</h1>
    </header>
    
    <main class="products__container">
    <form method="post" class="form">
            <div class="form__row">
                <input type="text" name="firstname" placeholder="Name">
                <input type="text" name="secondname" placeholder="Second name">
            </div>
            <div class="form__row">
                <input type="text" name="phone" placeholder="Phone">
                <input type="text" name="address" placeholder="Address">
            </div>
            <div class="form__row">
                <input type="time" min="<?=date("h:i")?>" name="phone" placeholder="Phone">
                <input type="text" name="address" placeholder="Comment" id="comment">
            </div>
        </form>
    </main>
</div>
<?php
require_once "include/footer.php";
?>
<script src="/js/order.js"></script>
