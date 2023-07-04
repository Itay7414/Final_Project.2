const models = require('../utils/db_utils/models');
const Order = models.Order;

exports.addToOrder = (req, res) => {
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

        // Get the current order data from cookies or initialize an empty order object
        const order = req.cookies.order || { username: null, items: [] };

        // Check if the user already has an order in the cookies
        if (order.username && order.username !== username) {
            console.log('User already has an order in the cookies');
            return res.status(400).json({ message: 'User already has an order' });
        }

        // Update the order with the new item
        order.username = username;
        order.items.push({
            name: fruitName,
            price: price,
            quantity: quantity
        });

        // Store the updated order in cookies
        res.cookie('order', order);

        console.log('Item added to order:', order);

        res.status(200).json(order);
    } catch (err) {
        console.error('Failed to add item to order:', err);
        res.status(500).json({ message: 'Failed to add item to order' });
    }
};