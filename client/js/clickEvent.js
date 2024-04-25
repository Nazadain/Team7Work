let basketMonitor = document.querySelector( '#basketToggle');
let basketButton = document.querySelector( '#basketButton');
let blackFade = document.querySelector('#blackFade');
let sum = 0;

document.addEventListener( 'click', (e) => {
	let insideMenu = e.composedPath().includes(basketMonitor);
    let insideButton = e.composedPath().includes(basketButton);
	if(insideButton) {
        if(!basketMonitor.classList.contains("show")) {
            basketMonitor.classList.add("show");
            blackFade.style.display = 'block';
        }
        else {
            basketMonitor.classList.remove("show");
            blackFade.style.display = 'none';
        }
    }
    else if(! insideMenu && basketMonitor.classList.contains("show")) {
        basketMonitor.classList.remove("show");
        blackFade.style.display = 'none';
    }
})
document.addEventListener('keydown', function(e) {
	if( e.keyCode == 27 && basketMonitor.classList.contains("show")){
		basketMonitor.classList.remove("show");
        blackFade.style.display = 'none';
	}
});