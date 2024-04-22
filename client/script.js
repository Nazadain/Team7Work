let flag = 0;
function OpenCloseBasket() {
    if (flag == 0) {
        document.getElementById("basketToggle").classList.add("show");
        flag = 1;
    }
    else {
        document.getElementById("basketToggle").classList.remove("show");
        flag = 0;
    }
}