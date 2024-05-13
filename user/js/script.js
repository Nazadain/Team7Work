const orders = document.querySelectorAll('.order__item');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const nav = document.querySelector('.header');
    if(scrollPosition >= 40) {
        nav.classList.add('fixed__header');
    }else {
        nav.classList.remove('fixed__header');
    }
});

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
    else if(orderItem.textContent == 'доставлен') {
        orderItem.classList.remove();
        orderItem.classList.add('closed');
    }
}