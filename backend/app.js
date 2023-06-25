require('dotenv').config();
const db = require('mongoose');
const express = require('express');


const load_routes = function (app) {
  app.use(require("../backend/routes/users"));
  app.use(require("../backend/routes/items"));
  app.use(require("../backend/routes/carts"));
}

const createApp = async function () {
  const app = await express();
  app.use(express.json());
  console.log('App Created !');
  await db.connect('mongodb+srv://mosacho1408:Mosacho1408@cluster0.7ygedx4.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Database Connected!');
  // Set up the app configuration
  app.set('port', process.env.PORT || 3000);
  await load_routes(app);


  return app;
}




module.exports = { db, createApp };