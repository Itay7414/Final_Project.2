const mongoose = require('mongoose');
const db = require('../../app'); // Assuming you have a separate App.js file

// Define the item schema
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

// Define the user schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Create the models
const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', userSchema);


// Export the models
module.exports = { Item, User };
