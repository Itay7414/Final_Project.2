// ordersControllers.js

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
      const order = req.cookies[`order_${username}`] || { username: null, items: [] };
  
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
      res.cookie(`order_${username}`, order);
  
      res.status(200).json(order);
    } catch (err) {
      console.error('Failed to add item to order:', err);
      res.status(500).json({ message: 'Failed to add item to order' });
    }
  };
  