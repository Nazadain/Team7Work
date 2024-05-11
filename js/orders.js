const orders = document.querySelectorAll('.order__item');

for(let i=0; i < orders.length; i++) {
    const orderItem = orders[i].querySelector('span');
    if(orderItem.textContent == 'in processing') {
        orderItem.classList.remove();
        orderItem.classList.add('in__processing');
    }
    else if(orderItem.textContent == 'on kitchen') {
        orderItem.classList.remove();
        orderItem.classList.add('on__kitchen');
    }
    else if(orderItem.textContent == 'in transit') {
        orderItem.classList.remove();
        orderItem.classList.add('in__transit');
    }
    else if(orderItem.textContent == 'closed') {
        orderItem.classList.remove();
        orderItem.classList.add('closed');
    }
}