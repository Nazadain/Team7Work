const orders = document.querySelectorAll('.order__item');

for(let i=0; i < orders.length; i++) {
    const orderItem = orders[i].querySelector('span');
    if(orderItem.textContent == 'in progress') {
        orderItem.classList.remove();
        orderItem.classList.add('in__progress');
    }
    else if(orderItem.textContent == 'on kitchen') {
        orderItem.classList.remove();
        orderItem.classList.add('on__kitchen');
    }
    else if(orderItem.textContent == 'delivering') {
        orderItem.classList.remove();
        orderItem.classList.add('delivering');
    }
    else if(orderItem.textContent == 'closed') {
        orderItem.classList.remove();
        orderItem.classList.add('closed');
    }
}