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
    res.render('fruits');
  });

  app.get('/vegetables', (req, res) => {
    res.render('vegetables');
  });

  app.get('/others', (req, res) => {
    res.render('others');
  });

  app.get('/orders', (req, res) => {
    res.render('orders');
  });

  app.get('/userprofile', (req, res) => {
    const username = req.cookies.user ? req.cookies.user.username : null; // Retrieve the 'username' cookie value if available
    res.render('userprofile', { username }); // Pass the 'username' variable to the template
  });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.get('/store_map', (req, res) => {
    res.render('store_map');
  });

  app.get('/transaction_history', (req, res) => {
    res.render('transaction_history');
  });

  return app;
};

module.exports = { db, createApp };

// require('dotenv').config();
// const db = require('mongoose');
// const express = require('express');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const path = require('path');

// const load_routes = function (app) {
//   app.use(require("../backend/routes/users"));
//   app.use(require("../backend/routes/items"));
//   app.use(require("../backend/routes/orders"));
// }

// const http = require('http');
// const server = http.createServer(app);
// require('./websocket.js')(server);


// // ... Other server code
// //live arcticles information shown
// const Parser = require('rss-parser');
// const parser = new Parser();


// const createApp = async function () {
//   const app = await express();
//   app.use(express.json());
//   app.use(cookieParser());
//   app.use(express.static(path.join(process.cwd(), '../frontend')));
//   app.use(require("./routes/users"));
//   app.use(require("./routes/items"));
//   app.use(require("./routes/orders"));
//   app.use(session({
//     secret: 'your-secret-key', // Replace with your own secret key
//     resave: false,
//     saveUninitialized: false,
//   }));
//   app.use(express.urlencoded({ extended: false }));
//   console.log('App Created !');
//   await db.connect('mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });
//   console.log('Database Connected!');
//   // Set up the app configuration
//   app.set('port', process.env.PORT || 3000);
//   app.set('view engine', 'ejs');
//   app.set('views', path.join(process.cwd(), '..', 'frontend', 'views'));
//   await load_routes(app);




//   app.get('/', (req, res) => {
//     const welcome = req.query.welcome === 'true'; // Check if welcome query parameter is true
//     const username = req.query.username; // Retrieve the username from the query parameter
//     res.render('index', { welcome, username });
//   });


//   app.get('/', (req, res) => {
//     res.render('index');
//   });

//   app.get('/fruits', (req, res) => {
//     res.render('fruits');
//   });

//   app.get('/vegetables', (req, res) => {
//     res.render('vegetables');
//   });

//   app.get('/others', (req, res) => {
//     res.render('others');
//   });
//   app.get('/orders', (req, res) => {
//     res.render('orders');
//   });

//   app.get('/userprofile', (req, res) => {
//     const username = req.cookies.username; // Retrieve the 'username' cookie value
//     res.render('userprofile', { username }); // Pass the 'username' variable to the template
//   });


//   app.get('/signup', (req, res) => {
//     res.render('signup');
//   });
//   app.get('/store_map', (req, res) => {
//     res.render('store_map');
//   });
//   app.get('/transaction_history', (req, res) => {
//     res.render('transaction_history');
//   });
//   return app;
// }




// module.exports = { db, createApp };