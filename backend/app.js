require('dotenv').config();
const db = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const load_routes = function (app) {
  app.use(require("../backend/routes/users"));
  app.use(require("../backend/routes/items"));
  app.use(require("../backend/routes/orders"));
}



const createApp = async function () {
  const app = await express();
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
  app.set('views', path.join(process.cwd(), '..', 'frontend', 'views'));
  await load_routes(app);


  app.get('/', (req, res) => {
    res.render('index');
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
    const username = req.cookies.username; // Retrieve the 'username' cookie value
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
}




module.exports = { db, createApp };