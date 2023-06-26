const models = require('../utils/db_utils/models');
const Cart = models.Cart;

exports.createCart = async (req, res) => {
    try {
        const { username, items } = req.body;

        // Retrieve the user's ID based on the username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new cart
        const cart = new Cart({
            user: user._id,
            items: items
        });

        // Save the cart to the database
        const createdCart = await cart.save();

        res.status(200).json(createdCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create cart' });
    }
};