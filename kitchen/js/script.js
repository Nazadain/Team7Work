const ordersContainer = document.querySelector('.container');

let dbOrdersData = dbData;
console.log(dbOrdersData);

function getOrdersData() {
    let orderData = [];

    for(order of dbOrdersData['order'])
    {
        if(order['status'] !== "в обработке") continue;
        
        const orderItems = getOrderItems(order);
        const menuItems = getMenuItemsName(orderItems);
        const orderItemsQuantity = [];

        for(let i = 0; i < orderItems.length; i++)
        {
            orderItemsQuantity[i] = orderItems[i]['quantity']
        }

        orderData = [{
            'id': order['id'],
            'status': order['status'],
            'namesArr': menuItems,
            'quantityArr': orderItemsQuantity
        }];
        
        renderOrder(orderData);
    }
}

function getOrderItems(order) {
    let orderItems = [];
    let i = 0;

    for(item of dbOrdersData['orderItem'])
    {
        if(item['order_id'] === order['id'])
        {
            orderItems[i] = item;
            i++;
        }
    }
    return orderItems;
}

function getMenuItemsName(orderItem) {
    let menuItems = [];
    let i = 0;

    for(item of orderItem) 
    {
        for(menu of dbOrdersData['menuItem'])
        {
            if(item['restaurant_menu_item'] === menu['id'])
            {
                menuItems[i] = menu['name'];
                i++
            }
        }
    }
    
    return menuItems;
}

function renderOrder(order) {
    order.forEach(element => {
        const {id, status, namesArr, quantityArr} = element;
        
        const orderItem = 

        `
        <div class="order">
            <form action="current-order.php" method = "GET">
            <input type="hidden" name="id" value="${id}">
            <button type="submit" class="submit__btn">Принять</button>
            </form>
            <h2>Заказ №${id} </h2>
            <p>Статус: <span class="status">${status}<span></p>
            
            <div class="products" id="order_${id}">
            <h3>Блюда:</h3>
            </div>
        </div>
        `;

        ordersContainer.insertAdjacentHTML('beforeend', orderItem);

        const itemId = `#order_${id}`
        const orders = document.querySelector(itemId);

        for(let i = 0; i < namesArr.length; i++)
        {
            const name = namesArr[i];
            const quantity = quantityArr[i];
            const menuItem = 
            `
            <span>${name} ${quantity}<br></span>
            `;

            orders.insertAdjacentHTML('beforeend', menuItem);
        }
    });
}
getOrdersData();