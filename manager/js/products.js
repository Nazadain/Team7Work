function closeFormClick(event)
{
    const btn = event.target.closest('.close');
    
    if(!btn) return;

    const form = btn.closest('.product__form');

    form.style.display = 'none';
}

function openFormClick(event)
{
    const btn = event.target.closest('.open__form-btn');
    
    if(!btn) return;

    if(btn.classList.contains('plus__item'))
    {
        const form = document.querySelector('.add__product');
        form.style.display = 'flex';
    }

    if(btn.classList.contains('edit'))
    {
        const product = btn.closest('.product__item');
        const productId = product.getAttribute('data-id');
        const productName = product.querySelector('.product__name').textContent;
        const productPrice = product.querySelector('.product__price').textContent;
        const productDesc = product.querySelector('.product__desc').textContent;

        const editForm = document.querySelector('.edit__product');
        document.querySelector('.data_id').value = productId;
        document.querySelector('.name').value = productName;
        document.querySelector('.price').value = productPrice;
        document.querySelector('.desc').value = productDesc;

        editForm.style.display = 'flex';
    }
}

document.addEventListener('click', openFormClick);
document.addEventListener('click', closeFormClick);