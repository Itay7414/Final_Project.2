const models = require('../utils/db_utils/models');
const Cart = models.Cart;
const User = models.User;


exports.createCart = async (req, res) => {
    try {
        const userId = req.body.userId;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user already has a cart
        const existingCart = await Cart.findOne({ user: userId });
        if (existingCart) {
            return res.status(400).json({ message: 'User already has a cart' });
        }

        // Create a new cart
        const cart = new Cart({
            user: userId,
            items: []
        });

        // Save the cart
        const createdCart = await cart.save();

        res.status(200).json(createdCart);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create cart' });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const item = req.body.item;
        const quantity = req.body.quantity;

        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Add the item to the cart
        cart.itam.push({
            type: item.type,
            name: item.name,
            price: item.price,
            quantity: quantity
        });

        // Save the updated cart
        const updatedCart = await cart.save();

        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
};
