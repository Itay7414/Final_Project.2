const models = require('../utils/db_utils/models');
const Order = models.Order;

exports.addToOrder = async (req, res) => {
    try {
        console.log('Start addtocart');
        const username = req.cookies.user.username;
        const fruitName = req.body.fruitName;
        const quantity = parseFloat(req.body.quantity);
        const price = parseFloat(req.body.price);
        console.log('userid: ', username);

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
            type: 'fruit',  // Add the type field
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
