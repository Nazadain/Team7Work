"use strict"
//==========================================
           /*Карточки товаров*/ 
//==========================================
const ERROR_SERVER = 'Ошибка сервера, попробуйте позже!';
const NO_PRODUCTS_IN_THIS_CATEGORY = 'Товаров в этой категории нет!';

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

// Проверка, существует ли товар
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
const container = document.querySelector('.container');
const cart = document.querySelector('.cart');
let r_cards = document.querySelector('.pizza');
let basket = document.querySelector( '#basketToggle');
let basketButton = document.querySelector( '#basketButton');
let blackFade = document.querySelector('#blackFade');
let sum = 0;
let productsData = [];

// Загрузка товаров
getProducts(0);

container.addEventListener('click', handleCardClick);
cart.addEventListener('click', delProductBasket);
document.addEventListener('click', basketClick);
document.addEventListener('keydown', function(e) {
	if( e.keyCode == 27 && basket.classList.contains("show")){
		basket.classList.remove("show");
        blackFade.style.display = 'none';
	}
});

// Получение товаров
async function getProducts(flag) {
    try {

        if (!productsData.length) {
            const res = await fetch('static/data/products.json');
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            productsData = await res.json();
        }
        if(flag == 0){
            renderStartPage(productsData);
            loadProductBasket(productsData);
        }
        else if(flag == 1) {
            loadProductBasket(productsData);
        }else {
            document.querySelector(".pizza").innerHTML = "";
            document.querySelector(".sushi").innerHTML = "";
            document.querySelector(".dessert").innerHTML = "";
            renderStartPage(productsData);
            loadProductBasket(productsData);
        }

            
        
    } catch (err) {
        console.log(err.message);
    }
}

function renderStartPage(data) {
    if (!data || !data.length) {
        showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
        return 
    };
    let arrCards = productsData.filter((data) => {return data.type == 'pizza'});
    r_cards = document.querySelector('.pizza');
    createCards(arrCards);
    arrCards = productsData.filter((data) => {return data.type == 'sushi'});
    r_cards = document.querySelector('.sushi');
    createCards(arrCards);
    arrCards = productsData.filter((data) => {return data.type == 'dessert'});
    r_cards = document.querySelector('.dessert');
    createCards(arrCards);

    checkingRelevanceValueBasket(data);

    const basket = getBasketLocalStorage();
    checkingActiveButtons(basket);
}

function handleCardClick(event) {
    const targetButton = event.target.closest('.card__add');
    if (!targetButton) return;

    const card = targetButton.closest('.card');
    const id = card.dataset.productId;
    const basket = getBasketLocalStorage();

    if (basket.includes(id)) return;
    basket.push(id);
    setBasketLocalStorage(basket);
    checkingActiveButtons(basket);
    getProducts(1);
}


function checkingActiveButtons(basket) {
    const buttons = document.querySelectorAll('.card__add');

    buttons.forEach(btn => {
        const card = btn.closest('.card');
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
        const { id, title, price, img, descr } = card;
		const cardItem = 
			`
            <div class="card" data-product-id="${id}">
                <a href="#" class="card__image">
                    <img
                        src="static/images/${img}"
                        alt="${name}"
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
        r_cards.insertAdjacentHTML('beforeend', cardItem);
	});
}

// Открытие/закрытие корзины
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

function loadProductBasket(data) {
    cart.textContent = '';

    checkingRelevanceValueBasket(data);
    const basket = getBasketLocalStorage();

    const findProducts = data.filter(item => basket.includes(String(item.id)));

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
    getProducts(2);
}

function renderProductsBasket(arr) {
    arr.forEach(card => {
        const { id, title, price, img} = card;
        const cardItem = 
        `
            <div class = "cart__product" data-product-id="${id}">
                <div class="cart__del-card" style = "cursor:pointer; width:20px; height:20px; background-color:red; color:white;";>x</div>
                <p>${title}</p>
                <p>Цена: ${price}</p>
            </div>
        `;

        cart.insertAdjacentHTML('beforeend', cardItem);
        
    });
}


