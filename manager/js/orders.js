function btnHandleClick(event) {
    btn = event.target.closest('.accept');
    btn.style.display = 'hidden';
}
addEventListener('click', btnHandleClick);