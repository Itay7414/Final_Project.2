require('dotenv').config();
const db = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

// const load_routes = function (app) {
//   app.use(require("./routes/users"));
//   app.use(require("./routes/items"));
//   app.use(require("./routes/orders"));
// };

const createApp = async function () {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(path.join(process.cwd(), '../frontend')));
  app.use(require("./routes/users"));
  app.use(require("./routes/items"));
  app.use(require("./routes/orders"));
  app.use(session({
    secret: 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
  }));
  app.use(express.urlencoded({ extended: false }));

  console.log('App Created !');

  await db.connect('mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Database Connected!');

  // Set up the app configuration
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', 'frontend', 'views'));  //await load_routes(app);
  app.get('/logout', async (req, res) => {
    try {
      // Clear the user's session or remove the user's cookie
      // For example, if you are using Express sessions with cookies:
      res.clearCookie('user'); // Clear the session cookie

      req.session.destroy(); // Destroy the session

      // Log a message to the terminal
      console.log('User logged out successfully.');

      // Redirect the user to the login page or any other desired page
      res.redirect('/'); // Redirect to the homepage
    } catch (error) {
      console.error('Error Logging Out:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/signin', async (req, res) => {
    try {
      // Check if the user is already authenticated
      if (req.session.user) {
        // User is already signed in, redirect to a different page
        return res.redirect('/dashboard');
      }

      // Call your existing sign-in method to handle the authentication
      const signInResult = await signInUser(req.body.username, req.body.password);

      // Assuming the sign-in method returns a user object upon successful authentication
      const user = signInResult.user;

      // Store the user object in the session
      req.session.user = user;
      res.cookie('user', user);

      // Redirect the user to the dashboard or any other desired page
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error Signing In:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/check-login', (req, res) => {
    if (req.session.user || req.cookies.user) {
      // User is logged in
      return res.status(200).json({ loggedIn: true, user: req.session.user || req.cookies.user });
    } else {
      // User is not logged in
      return res.status(200).json({ loggedIn: false });
    }
  });
  app.get('/', function (req, res) {
    // Check if the user is logged in and retrieve the username from the session or wherever you store it
    var loggedIn = req.session.loggedIn;
    var username = req.session.username;

    // Render the index.ejs template and pass the loggedIn and username variables as data
    res.render('index', { loggedIn: loggedIn, username: username });
  });

  app.get('/fruits', (req, res) => {
    const username = req.cookies.user ? req.cookies.user.username : null; // Retrieve the 'username' cookie value if available
    res.render('fruits', { username });
  });




  app.post('/orders/addToOrder', async (req, res) => {
    try {
      const { itemName, quantity, price } = req.body;
      const username = req.cookies.user ? req.cookies.user.username : null;

      // Retrieve the user ID from the cookies (if available)
      const userId = req.cookies.user ? req.cookies.user.userId : null;

      // Check if the user is authenticated
      if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Find the user based on the username
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create a new order item
      const item = { name: itemName, price };

      // Find the order document based on the user
      let order = await Order.findOne({ user });

      if (!order) {
        // If the order doesn't exist, create a new order document
        order = new Order({ user, items: [item] });
      } else {
        // If the order already exists, add the new item to the existing items array
        order.items.push(item);
      }

      // Save the updated order document
      await order.save();

      // Store the order data in the cookies with the username as the key
      res.cookie(`order_${username}`, order);

      // Return the response
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error('Error adding item to order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/vegetables', (req, res) => {
    const username = req.cookies.user ? req.cookies.user.username : null; // Retrieve the 'username' cookie value if available
    res.render('vegetables', { username });
  });

  app.get('/others', (req, res) => {
    const username = req.cookies.user ? req.cookies.user.username : null; // Retrieve the 'username' cookie value if available
    res.render('others', { username });
  });


  app.get('/orders', (req, res) => {
    const username = req.cookies.user ? req.cookies.user.username : null; // Retrieve the 'username' cookie value if available

    const items = req.cookies[`order`] || req.session.order || []; // Retrieve 'order' array from cookies first, then from session if not found

    res.render('orders', { username, items });
  });


  app.get('/userprofile', (req, res) => {
    const username = req.cookies.user ? req.cookies.user.username : null; // Retrieve the 'username' cookie value if available
    res.render('userprofile', { username }); // Pass the 'username' variable to the template
  });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.get('/store_map', (req, res) => {
    const username = req.cookies.user ? req.cookies.user.username : null; // Retrieve the 'username' cookie value if available
    res.render('store_map', { username });
  });

  app.get('/transaction_history', (req, res) => {
    const username = req.cookies.user ? req.cookies.user.username : null; // Retrieve the 'username' cookie value if available
    res.render('transaction_history', { username });
  });

  return app;
};

module.exports = { db, createApp };