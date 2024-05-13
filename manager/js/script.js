const orders = document.querySelectorAll('.order__item');

for(let i=0; i < orders.length; i++) {
    const orderItem = orders[i].querySelector('span');
    if(orderItem.textContent == 'в обработке') {
        orderItem.classList.remove();
        orderItem.classList.add('in__progress');
    }
    else if(orderItem.textContent == 'на кухне') {
        orderItem.classList.remove();
        orderItem.classList.add('on__kitchen');
    }
    else if(orderItem.textContent == 'в пути') {
        orderItem.classList.remove();
        orderItem.classList.add('delivering');
    }
    else if(orderItem.textContent == 'закрыт') {
        orderItem.classList.remove();
        orderItem.classList.add('closed');
    }
}