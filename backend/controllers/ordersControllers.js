const models = require('../utils/db_utils/models');
const Order = models.Order;
const User = models.User;



exports.createOrder = async (req, res) => {
    try {
        const userId = req.body.userId;


        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user already has a cart
        const existingOrder = await Order.findOne({ user: userId });
        if (existingOrder) {
            return res.status(400).json({ message: 'User already has a cart' });
        }

        // Create a new cart
        const order = new Order({
            user: userId,
            items: []
        });

        // Save the cart
        const createOrder = await order.save();
        res.status(200).json(createOrder);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create cart' });

    }
};

exports.addToOrder = async (req, res) => {
    try {
        const userId = req.body.userId;
        const item = req.body.item;
        const quantity = req.body.quantity;

        // Find the user's order
        const Order = await Order.findOne({ user: userId });
        if (!Order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Add the item to the order
        cart.itam.push({
            type: item.type,
            name: item.name,
            price: item.price,
            quantity: quantity
        });

        // Save the updated order
        const updatedOrder = await Order.save();

        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
};
