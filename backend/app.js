require('dotenv').config();
const db = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');




const path = require('path');

const load_routes = function (app) {
  app.use(require("../backend/routes/users"));
  app.use(require("../backend/routes/items"));
  app.use(require("../backend/routes/carts"));
}



const createApp = async function () {
  const app = await express();
  app.use(express.json());
  app.use(cookieParser());
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

  return app;
}




module.exports = { db, createApp };