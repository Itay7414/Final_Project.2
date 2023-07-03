function addToOrder(itemName, itemPrice) {
    // Get the current order from the cookies
    const orderCookie = Cookies.get('order');
    let order = {};

    if (orderCookie) {
        // Parse the existing order from JSON
        order = JSON.parse(orderCookie);
    }

    // Add the new item to the order or update its quantity
    if (order[itemName]) {
        order[itemName].quantity++;
    } else {
        order[itemName] = {
            quantity: 1,
            price: parseFloat(itemPrice),
        };
    }

    // Store the updated order in the cookies
    Cookies.set('order', JSON.stringify(order));

    console.log('Item added to order:', order);
}
