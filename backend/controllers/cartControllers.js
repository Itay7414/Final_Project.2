const models = require('../utils/db_utils/models');
cart_model = models.Cart;



exports.createCart = async (req, res) => {
    try {
        const { userId, items } = req.body;

        // Create a new cart
        const cart = new cart_model({
            user: userId,
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