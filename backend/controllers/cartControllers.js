const models = require('../utils/db_utils/models');
const Cart = models.Cart;
const User = models.User;

exports.createCart = async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new cart
        const cart = new Cart({
            user: user._id,
            items: items
        });
        console.log("cart creating!");
        // Save the cart
        const createdCart = await cart.save();
        res.status(200).json(createdCart);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};