const cardAddArr = document.querySelector(".card__add");
const cartItems = document.querySelector('.cart__items');
const cartContainer = document.querySelector('.cart__container');
const cartButton = document.querySelector('.cart__link');
const windowShadow = document.querySelector('.window__shadow');
let spliceIndex;
let cartProducts;
let isCartFull = false;

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
  card.querySelector('.card__add').innerText = "In cart";
  if(!isCartFull) {
    cartProducts = cartSet(cardId, cardTitle, cardImage, cardDescription, cardPrice);
    isCartFull = true;
  }else
    cartAddProduct(cardId, cardTitle, cardImage, cardDescription, cardPrice);
  renderCart(cartProducts);
}

function cartQuantityClick(event) {
  const btn = event.target.closest(".minus, .plus");
  if(!btn) return;
  const card = btn.closest('.cart__product');
  const cardId = card.dataset.productId;
  // const cartBtn = card.querySelector('.card__add');
  let cartItem;
  for(let i = 0; i < cartProducts.length; i++) {
    if(cardId == cartProducts[i].id) {
      cartItem = cartProducts[i];
      spliceIndex = i;
      break;
    }
  }
  if(btn.classList == "plus")
    cartPlus(cartItem);
  else {
    cartMinus(cartItem);
    if(cartItem.quantity <= 0) {
      // cartBtn.innerText = "Add to cart";
      // cartBtn.classList.remove('in__cart');
      cartProducts.splice(spliceIndex, 1);
      cardBtnActive(cardId);
    }
    if(cartProducts.length <= 0) {
      isCartFull = false;
    }
  }
  renderCart(cartProducts);
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
  renderCart(cartProducts);
}

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
    isCartFull = false;
  }
  cardBtnActive(cardId);
  renderCart(cartProducts);
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

function cardBtnActive(cardId) {
  let product = document.querySelectorAll('.card');
  let productId;
  let addBtn;
  for(let i = 0; i < product.length; i++) {
    productId = product[i].querySelector(".product__id").value;
    if(productId == cardId) {
      addBtn = product[i].querySelector('.card__add');
      addBtn.classList.remove('in__cart');
      addBtn.innerText = "Add to cart";
      break;
    }
  }
}

function cartData() {
  let jsonProducts = JSON.stringify(cartProducts);
  $.ajax({
    url: '/index.php',
    type: 'POST',
    data: {data: jsonProducts},
    success: function() {
    }
});
}

function renderCart(arr) {
  cartContainer.innerHTML = '';
  let fullPrice = 0;
  arr.forEach(card => {
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
  if(isCartFull == true) {
    cardContainer = 
    `
    <p>Итого: ${fullPrice}₽</p>
    <a href="#" class="order__button">Оформить заказ</a>
    `;
  }
  else {
    cardContainer = '';
  }
  cartContainer.insertAdjacentHTML('beforeend', cardContainer);
  cartData();
}