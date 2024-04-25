const cartMonitor = document.querySelector( '#cartToggle');
const cartButton = document.querySelector( '#cartButton');
const blackFade = document.querySelector('#blackFade');
let cart = {
    'pizz001' : {
        "name" : "Салями",
        "price" : 589,
        "count" : 0,
    },
    'pizz002' : {
        "name" : "Оливковая",
        "price" : 699,
        "count" : 0,
    },
    'pizz003' : {
        "name" : "Песто",
        "price" : 899,
        "count" : 0,
    },
    'roll001' : {
        "name" : "Калифорния",
        "price" : 399,
        "count" : 0,
    },
    'roll002' : {
        "name" : "Филадельфия",
        "price" : 289,
        "count" : 0,
    },
    'roll003' : {
        "name" : "Маки",
        "price" : 189,
        "count" : 0,
    },
    'dess001' : {
        "name" : "Тирамису",
        "price" : 199,
        "count" : 0,
    },
    'dess002' : {
        "name" : "Чизкейк",
        "price" : 199,
        "count" : 0,
    },
    'dess003' : {
        "name" : "Моти",
        "price" : 189,
        "count" : 0,
    }
}
let sum = 0;

document.addEventListener( 'click', (e) => {
	let insideMenu = e.composedPath().includes(cartMonitor);
    let insideButton = e.composedPath().includes(cartButton);
	if(insideButton) {
        if(!cartMonitor.classList.contains("show")) {
            cartMonitor.classList.add("show");
            blackFade.style.display = 'block';
        }
        else {
            cartMonitor.classList.remove("show");
            blackFade.style.display = 'none';
        }
    }
    else if(! insideMenu && cartMonitor.classList.contains("show")) {
        cartMonitor.classList.remove("show");
        blackFade.style.display = 'none';
    }
    else if(e.target.classList.contains('plus')) {
        plusFunction(e.target.dataset.id);
    }
    else if(e.target.classList.contains('minus')) {
        minusFunction(e.target.dataset.id);
    }
})
document.addEventListener('keydown', function(e) {
	if( e.keyCode == 27 && cartMonitor.classList.contains("show")){
		cartMonitor.classList.remove("show");
        blackFade.style.display = 'none';
	}
});

function plusFunction(id) {
    cart[id]["count"]++;
    sum += cart[id]["price"];
    console.log(sum);
    renderCart();
}

function minusFunction(id) {
    cart[id]["count"]--;
    renderCart();
}

function renderCart() {
    console.log(cart);
}