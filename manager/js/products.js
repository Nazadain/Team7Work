document.querySelector('.plus__item').onclick = () => {
    document.querySelector('.add__product').style.display = 'flex';
}
document.querySelector('.close').onclick = () => {
    document.querySelector('.add__product').style.display = 'none';
}