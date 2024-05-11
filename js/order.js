let cart = getCookie();
let totalPrice = 0;
let cartContainer = document.querySelector(".products__container");

for(key in cart) {
    let title = cart[key]["title"];
    let image = cart[key]["image"]
    let price = cart[key]["price"];
    let quantity = cart[key]["quantity"];
    totalPrice += price * quantity;
    let product = `
    <div class="product">
        <img src="${image}">
        <h3>${title}</h3>
        <p>${quantity}</p>
        <p class="price">${price}₽</p>
    </div>
    `;
    cartContainer.insertAdjacentHTML("afterbegin", product);
}

let total = 
        `
        <div class="form__footer">
            <p>Total: ${totalPrice}₽</p>
            <input type="submit" value="Make order" id="submit">
        </div>
        `;
document.querySelector('.form').insertAdjacentHTML("beforeend", total);