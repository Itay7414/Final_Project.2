// ordersControllers.js
const models = require('../utils/db_utils/models');
const Order = models.Order;

exports.addToOrder = (req, res) => {
  try {
    const username = req.cookies.user.username; // Get the username from cookies

    if (!username) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const itemName = req.body.itemName;
    const quantity = parseFloat(req.body.quantity);
    const price = parseFloat(req.body.price);

    // Get the current order data from cookies or initialize an empty order object
    const order = req.cookies[`order`] || { username, items: [] };

    // Check if the user already has an order in the cookies
    if (order.username && order.username !== username) {
      return res.status(400).json({ message: 'User already has an order' });
    }

    // Check if the item already exists in the order
    const existingItem = order.items.find((item) => item.name === itemName);
    if (existingItem) {
      existingItem.quantity += quantity; // Update the quantity
    } else {
      // Add the new item to the order
      order.items.push({
        name: itemName,
        price: price,
        quantity: quantity,
      });
    }

    // Store the updated order in cookies
    res.cookie(`order`, order);

    res.status(200).json(order);
  } catch (err) {
    console.error('Failed to add item to order:', err);
    res.status(500).json({ message: 'Failed to add item to order' });
  }
};

exports.submitOrder = async (req, res) => {
  try {
    console.log('hey');
    const { username } = req.cookies.user; // Retrieve the username from the cookies
    const order = req.cookies.order || {}; // Retrieve the order from the cookies

    // Create anewOrder document in the database
    const newOrder = await Order.create({
      username: username,
      items: order.items
    });

    // Clear the order cookie
    res.clearCookie('order');
    console.log('Order submitted successfully');

    // Return a success response
    res.status(200).json({ message: 'Order submitted successfully' });
  } catch (error) {
    console.error('Failed to submit order:', error);
    res.status(500).json({ error: 'Failed to submit order' });
  }
};