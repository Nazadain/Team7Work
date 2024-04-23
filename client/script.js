let basket = document.querySelector( '#basketToggle');
let basketButton = document.querySelector( '#basketButton');
document.addEventListener( 'click', (e) => {
	let insideMenu = e.composedPath().includes(basket);
    let insideButton = e.composedPath().includes(basketButton);
	if(insideButton) {
        if(!basket.classList.contains("show")) {
            basket.classList.add("show");
        }
        else {
            basket.classList.remove("show");
        }
    }
    else if(! insideMenu && basket.classList.contains("show")) {
        basket.classList.remove("show");
    }
})
document.addEventListener('keydown', function(e) {
	if( e.keyCode == 27 && basket.classList.contains("show")){ // код клавиши Escape, но можно использовать e.key
		basket.classList.remove("show");
	}
});