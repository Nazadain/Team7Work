
let cartContainer = document.querySelector('.cart__container');
let cartButton = document.querySelector('.cart__link');
let windowShadow = document.querySelector('.window__shadow');

function cartClick(event) {
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

document.addEventListener('click', cartClick);
document.addEventListener('keydown', (e) => {
	if( e.keyCode == 27 && cartContainer.classList.contains("cart__show")){
		cartContainer.classList.remove("cart__show");
        windowShadow.style.display = 'none';
	}
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const nav = document.querySelector('.header');
    if(scrollPosition >= 40) {
        nav.classList.add('fixed__header');
    }else {
        nav.classList.remove('fixed__header');
    }
});