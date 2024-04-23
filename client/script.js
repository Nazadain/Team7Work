let basket = document.querySelector( '#basketToggle');
let basketButton = document.querySelector( '#basketButton');
let blackFade = document.querySelector('#blackFade');
document.addEventListener( 'click', (e) => {
	let insideMenu = e.composedPath().includes(basket);
    let insideButton = e.composedPath().includes(basketButton);
	if(insideButton) {
        if(!basket.classList.contains("show")) {
            basket.classList.add("show");
            blackFade.style.display = 'block';
        }
        else {
            basket.classList.remove("show");
            blackFade.style.display = 'none';
        }
    }
    else if(! insideMenu && basket.classList.contains("show")) {
        basket.classList.remove("show");
        blackFade.style.display = 'none';
    }
})
document.addEventListener('keydown', function(e) {
	if( e.keyCode == 27 && basket.classList.contains("show")){
		basket.classList.remove("show");
        blackFade.style.display = 'none';
	}
});