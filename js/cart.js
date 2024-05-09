const cardAddArr = document.querySelector(".card__add");
const cartItems = document.querySelector('.cart__items');
const cartContainer = document.querySelector('.cart__container');
const cartButton = document.querySelector('.cart__link');
const windowShadow = document.querySelector('.window__shadow');
let cartProducts;
let flag = false;

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
  if(!flag) {
    cartProducts = cartSet(cardId, cardTitle, cardImage, cardDescription, cardPrice);
    flag = true;
  }else
    cartAddProduct(cardId, cardTitle, cardImage, cardDescription, cardPrice);
  console.log(cartProducts)
}

function cartQuantityClick(event) {
  const btn = event.target.closest(".minus, .plus");
  if(!btn) return;
  const card = btn.closest('.card');
  const cardId = card.querySelector('.product__id').value;
  const cartBtn = card.querySelector('.card__add');
  let cartItem;
  for(let i = 0; i < cartProducts.length; i++) {
    if(cardId == cartProducts[i].id) {
      cartItem = cartProducts[i];
    }
  }
  if(btn.classList == "plus")
    cartPlus(i);
  else {
    cartMinus(cartItem);
    if(cartItem.quantity <= 0) {
      cartBtn.innerText = "Add to cart";
      cartBtn.classList.remove('in__cart');
      cartProducts[i] = '';
      console.log(cartProducts);
    }
  }
    

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
}

function cartPlus(cartItem) {
  cartItem.quantity++;
}

function cartMinus(cartItem) {
  cartItem.quantity--;
}

document.addEventListener('click', cartAddClick);
document.addEventListener('click', cartQuantityClick);
document.addEventListener('click', cartOpenClick);
document.addEventListener('keydown', (e) => {
	if( e.keyCode == 27 && cartContainer.classList.contains("cart__show")){
		cartContainer.classList.remove("cart__show");
        windowShadow.style.display = 'none';
	}
});

function renderCart(arr) {
  arr.forEach(card => {
      const { id, img, title, price} = card;
      const priceDiscount = price - ((price * discount) / 100);

      const cardItem = 
      `
      <div class="cart__product" data-product-id="${id}">
          <div class="cart__img">
              <img src="./images/${img}" alt="${title}">
          </div>
          <div class="cart__title">${title}</div>
          <div class="cart__block-btns">
              <div class="cart__minus">-</div>
              <div class="cart__count">1</div>
              <div class="cart__plus">+</div>
          </div>
          <div class="cart__price">
              <span>${price}</span>₽
          </div>
          <div class="cart__price-discount">
              <span>${priceDiscount}</span>₽
          </div>
          <div class="cart__del-card">X</div>
      </div>
      `;

      cart.insertAdjacentHTML('beforeend', cardItem);
  });
}