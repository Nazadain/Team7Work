const cardAddArr = document.querySelector(".card__add");
const cartItems = document.querySelector('.cart__items');
const cartContainer = document.querySelector('.cart__container');
const cartButton = document.querySelector('.cart__link');
const windowShadow = document.querySelector('.window__shadow');
let cartProducts;
let spliceIndex;
let isCartEmpty = true;

if(document.cookie.match('cart')) {
  cartProducts = getCookie('cart');
}

if(cartProducts && cartProducts.length >= 1) {
  isCartEmpty = false;
}

renderCart()

//обработчик нажатия на кнопку "cart"
function cartOpenClick(event) {
    let insideMenu = event.composedPath().includes(cartContainer);
    let insideButton = event.composedPath().includes(cartButton);
	if(insideButton) {
        if(!cartContainer.classList.contains("cart__show")) {
            cartContainer.classList.add("cart__show");
            windowShadow.style.display = 'block';
        }else {
            cartContainer.classList.remove("cart__show");
            windowShadow.style.display = 'none';
        }
    }else if(!insideMenu && cartContainer.classList.contains("cart__show")){
        cartContainer.classList.remove("cart__show");
        windowShadow.style.display = 'none';
    }
}

//обработчик нажатия по кнопке "В корзину"
function cartAddClick(event) {
  const targetButton = event.target.closest('.card__add');
  if(!targetButton) 
    return;
  const card = targetButton.closest('.card');
  let cardId = card.querySelector('.product__id').value;
  let cardTitle = card.querySelector('.card__title').innerText;
  let cardImage = card.querySelector('.img__item').src;
  let cardDescription = card.querySelector('.card__description').innerText;
  let cardPrice = card.querySelector('.card__price').innerText;
  card.querySelector('.card__add').classList.add('in__cart');
  card.querySelector('.card__add').innerText = "В корзине";
  if(isCartEmpty) {
    cartProducts = cartSet(cardId, cardTitle, cardImage, cardDescription, cardPrice);
    isCartEmpty = false;
  }else
    cartAddProduct(cardId, cardTitle, cardImage, cardDescription, cardPrice);
  setCartCookie();
  renderCart()
}

//обработчик нажатия на кнопки "+" и "-" у товара в корзине
function cartQuantityClick(event) {
  const btn = event.target.closest(".minus, .plus");

  if(!btn) return;

  const card = btn.closest('.cart__product');
  const cardId = card.dataset.productId;
  let cartItem;

  for(let i = 0; i < cartProducts.length; i++) {
    if(cardId == cartProducts[i].id) {
      cartItem = cartProducts[i];
      spliceIndex = i;
      break;
    }
  }

  if(btn.classList == "plus") {
    cartPlus(cartItem);
  }else {
    cartMinus(cartItem);
    if(cartItem.quantity <= 0) {
      cartProducts.splice(spliceIndex, 1);
      setBtnState(cardId)
    }
    if(cartProducts.length <= 0) {
      isCartEmpty = true;
    }
  }

  setCartCookie();
  renderCart()
}

//запись данных о товарах в корзине в куки
function setCartCookie() {
  document.cookie = "cart=" + JSON.stringify(cartProducts);
}

function cartSet(id, title, image, desc, price) {
  let cartProducts = [{
    "id" : id,
    "title" : title,
    "image" : image,
    "desc" : desc,
    "price" : price,
    "quantity" : 1
  }];
  return cartProducts;
}

function cartAddProduct(id, title, image, desc, price) {
  for(let i = 0; i < cartProducts.length; i++) {
    let obj = cartProducts[i];
    if(obj.id.includes(id)) {
      obj.quantity++;
      return;
    }
  }
  cartProducts.push({"id": id, "title": title, "image": image, "desc": desc, "price": price, "quantity" : 1});
  renderCart()
}

//обработчик нажатия по кнопке "Удалить из корзины"
function cartDelClick(event) {
  const btn = event.target.closest('.cart__del-card');
  if(!btn) return;
  const card = btn.closest('.cart__product');
  let cardId = card.dataset.productId;
  for(let i = 0; i < cartProducts.length; i++) {
    if(cardId == cartProducts[i].id) {
      cartProducts.splice(i, 1);
      break;
    }
  }
  if(cartProducts.length <= 0) {
    isCartEmpty = true;
  }
  setBtnState(cardId)
  setCartCookie();
  renderCart()
}

function cartPlus(cartItem) {
  cartItem.quantity++;
}

function cartMinus(cartItem) {
  cartItem.quantity--;
}

document.addEventListener('click', cartAddClick);
document.addEventListener('click', cartDelClick);
document.addEventListener('click', cartQuantityClick);
document.addEventListener('click', cartOpenClick);
document.addEventListener('keydown', (e) => {
	if( e.keyCode == 27 && cartContainer.classList.contains("cart__show")){
		cartContainer.classList.remove("cart__show");
        windowShadow.style.display = 'none';
	}
});

//изменения состояния кнопки "Add in cart"
function setBtnState(cardId) {
  let product = document.querySelectorAll('.card');
  for(let i = 0; i < product.length; i++) {
    const productId = product[i].querySelector(".product__id").value;
    if(productId == cardId) {
      const addBtn = product[i].querySelector('.card__add');
      addBtn.classList.remove('in__cart');
      addBtn.innerText = "В корзину";
      break;
    }
  }
}

function renderCart() {
  cartContainer.innerHTML = '';
  if(isCartEmpty) {
    const emptyCart = `
    <h2>Корзина пуста</h2>
    `;
    cartContainer.insertAdjacentHTML('beforeend', emptyCart);
    return;
  }
  
  let fullPrice = 0;
  cartProducts.forEach(card => {
      const { id, image, title, price, quantity} = card;
      fullPrice += Number(price) * Number(quantity);
      const cardItem = 
      `
      <div class="cart__product" data-product-id="${id}">
          <div class="cart__image">
              <img src="${image}" alt="${title}">
          </div>
          <div class="cart__title">${title}</div>
          <div class="cart__block-btns">
              <button class="minus">-</button>
              <div class="cart__count">${quantity}</div>
              <button class="plus">+</button>
          </div>
          <div class="cart__price">
              <span>${price}</span>₽
          </div>
          <button class="cart__del-card">X</button>
      </div>
      `;
      cartContainer.insertAdjacentHTML('beforeend', cardItem);
  });
  let cardContainer;
  if(!isCartEmpty) {
    cardContainer = 
    `
    <p>Total: ${fullPrice}₽</p>
    <a href="checkout.php" class="order__button">Оформить заказ</a>
    `;
  }
  else {
    cardContainer = '';
  }
  cartContainer.insertAdjacentHTML('beforeend', cardContainer);
}