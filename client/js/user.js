<<<<<<< Updated upstream:client/script.js
let flag = 0;
function OpenCloseBasket() {
    if (flag == 0) {
        document.getElementById("basketToggle").classList.add("show");
        flag = 1;
=======
"use strict"
let cartMonitor = document.querySelector( '#cartToggle');
let cartButton = document.querySelector( '#cartButton');
let blackFade = document.querySelector('#blackFade');
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
>>>>>>> Stashed changes:client/js/user.js
    }
    else {
        document.getElementById("basketToggle").classList.remove("show");
        flag = 0;
    }
}