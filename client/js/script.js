"use strict"
//==========================================
           /*Карточки товаров*/ 
//==========================================
const COUNT_SHOW_CARDS_CLICK = 5;
const ERROR_SERVER = 'Ошибка сервера, попробуйте позже!';
const NO_PRODUCTS_IN_THIS_CATEGORY = 'Товаров в этой категории нет!';

function showErrorMessage(message) {
    const h1 = document.querySelector('.wrapper h1')
    const msg = 
        `<div class="error">
            <p>${message}</p>
            <p><a href="/">Перейти к списку товаров!</a></p>
        </div>`;
    h1.insertAdjacentHTML('afterend', msg);
}

// Получение id из LS
function getBasketLocalStorage() {
    const cartDataJSON = localStorage.getItem('basket');
    return cartDataJSON ? JSON.parse(cartDataJSON) : [];
}

// Запись id товаров в LS
function setBasketLocalStorage(basket) {
    const basketCount = document.querySelector('.basket__count');
    localStorage.setItem('basket', JSON.stringify(basket));
    basketCount.textContent = basket.length;
}

// Проверка, существует ли товар указанный в LS 
//(если например пару дней не заходил юзер, а товар, который у него в корзине, уже не существует)
function checkingRelevanceValueBasket(productsData) {
    const basket = getBasketLocalStorage();

    basket.forEach((basketId, index) => {
        const existsInProducts = productsData.some(item => item.id === Number(basketId));
        if (!existsInProducts) {
            basket.splice(index, 1);
        }
    });

    setBasketLocalStorage(basket);
}
//==========================================
              /*Переменные*/ 
//==========================================
const cards = document.querySelector('.cards');
let basket = document.querySelector( '#basketToggle');
let basketButton = document.querySelector( '#basketButton');
let blackFade = document.querySelector('#blackFade');
let productsData = [];

// Загрузка товаров
getProducts()

cards.addEventListener('click', handleCardClick);
document.addEventListener('click', basketClick);
document.addEventListener('keydown', function(e) {
	if( e.keyCode == 27 && basket.classList.contains("show")){
		basket.classList.remove("show");
        blackFade.style.display = 'none';
	}
});

// Получение товаров
async function getProducts() {
    try {

        if (!productsData.length) {
            const res = await fetch('../data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }
        
        renderStartPage(productsData);

    } catch (err) {
        showErrorMessage(ERROR_SERVER);
        console.log(err.message);
    }
}

function renderStartPage(data) {
    if (!data || !data.length) {
        showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
        return 
    };

    let arrCards = productsData.filter((x) => {return x.type == 'pizza'});
    createCards(arrCards);

    checkingRelevanceValueBasket(data);

    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);
}


function sliceArrCards() {
    if(shownCards >= productsData.length) return;

    let arrCards = productsData.filter((data) => {return data.id > 5});
    createCards(arrCards);
    shownCards = cards.children.length;
}


function handleCardClick(event) {
    const targetButton = event.target.closest('.card__add');
    if (!targetButton) return;

    const card = targetButton.closest('.card');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    if (basket.includes(id)) return;
    basket.push(id);
    console.log(id);
    setBasketLocalStorage(basket);
    checkingActiveButtons(basket);
}


function checkingActiveButtons(basket) {
    const buttons = document.querySelectorAll('.card__add');

    buttons.forEach(btn => {
        const card = btn.closest('.pizza');
        const id = card.dataset.productId;
        const isInBasket = basket.includes(id);

        btn.disabled = isInBasket;
        btn.classList.toggle('active', isInBasket);
        btn.textContent = isInBasket ? 'В корзине' : 'В корзину';
    });
}


// Рендер карточки
function createCards(data) {
    data.forEach(card => {
        const { id, title, type, price, img, descr } = card;
		const cardItem = 
			`
            <div class="card" data-id="${id}">
                <a href="#" class="card__image">
                    <img
                        src="./images/${img}"
                        alt="${title}"
                    />
                </a>
                <h3>${title}</h3>
                <p class="description">${descr}</p>
                <footer>
                    <button class="card__add">В корзину</button>
                    <p class="price"><b>${price}₽</b></p>
                </footer>
            </div>
            `
        cards.insertAdjacentHTML('beforeend', cardItem);
	});
}

function basketClick(event) {
    let insideMenu = event.composedPath().includes(basket);
    let insideButton = event.composedPath().includes(basketButton);
	if(insideButton) {
        if(!basket.classList.contains("show")) {
            basket.classList.add("show");
            blackFade.style.display = 'block';
        }else {
            basket.classList.remove("show");
            blackFade.style.display = 'none';
        }
    }else if(!insideMenu && basket.classList.contains("show")){
        basket.classList.remove("show");
        blackFade.style.display = 'none';
    }
}
//==========================================
                /*Корзина*/ 
//==========================================

//const cart = document.querySelector('.cart');
//cart.addEventListener('click', delProductBasket);

function loadProductBasket(data) {
    cart.textContent = '';

    if (!data || !data.length) {
        showErrorMessage(ERROR_SERVER)
        return;
    }

    checkingRelevanceValueBasket(data);
    const basket = getBasketLocalStorage();

    if(!basket || !basket.length) {
        showErrorMessage(NO_ITEMS_CART)
        return;
    }

    const findProducts = data.filter(item => basket.includes(String(item.id)));

    if(!findProducts.length) {
        showErrorMessage(NO_ITEMS_CART)
        return;
    }

    renderProductsBasket(findProducts);
}

function delProductBasket(event) {
    const targetButton = event.target.closest('.cart__del-card');
    if (!targetButton) return;

    const card = targetButton.closest('.cart__product');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    const newBasket = basket.filter(item => item !== id);
    setBasketLocalStorage(newBasket);

    getProducts()
}

function renderProductsBasket(arr) {
    arr.forEach(card => {
        const { id, title, type, price, img, descr } = card;
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


