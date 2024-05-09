window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const nav = document.querySelector('.header');
    if(scrollPosition >= 40) {
        nav.classList.add('fixed__header');
    }else {
        nav.classList.remove('fixed__header');
    }
});