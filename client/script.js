let flag = 0;
function OpenCloseBasket() {
    if (flag == 0) {
        document.getElementById("basketToggle").style.display = 'block';
        flag = 1;
    }
    else {
        document.getElementById("basketToggle").style.display = 'none';
        flag = 0;
    }
}
