require('dotenv').config();
const db = require('mongoose');
const express = require('express');

const createApp = async function () {
    const app = await express();
  
    // Set up the app configuration
    app.set('port', process.env.PORT || 3000);
  
    return app;
  }
  


module.exports = { db, createApp };