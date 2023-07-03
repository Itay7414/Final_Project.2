const models = require('../utils/db_utils/models');
const Order = models.Order;

exports.addToOrder = async (req, res) => {
    try {
        console.log('Start addtocart');
        const username = req.cookies.user.username; // Get the username from cookies
        const fruitName = req.body.fruitName;
        const quantity = parseFloat(req.body.quantity);
        const price = parseFloat(req.body.price);

        console.log('username: ', username);
        console.log('fruitName: ', fruitName);
        console.log('quantity: ', quantity);
        console.log('price: ', price);

        if (!username) {
            console.log('not exist addtocart');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Check if the user already has an order
        let order = await Order.findOne({ user: username });

        // If the user doesn't have an order, create a new one
        if (!order) {
            order = new Order({
                user: username,
                items: []
            });
        }

        // Add the item to the order
        order.items.push({
            name: fruitName,
            price: price,
            quantity: quantity
        });

        // Save the updated order
        const updatedOrder = await order.save();

        console.log('Item added to order:', updatedOrder);

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error('Failed to add item to order:', err);
        res.status(500).json({ message: 'Failed to add item to order' });
    }
};
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
