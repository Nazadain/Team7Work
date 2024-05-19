function btnHandleClick(event) {
    btn = event.target.closest('.accept');
    if(!btn) return;
    btn.style.display = 'hidden';
}
addEventListener('click', btnHandleClick);