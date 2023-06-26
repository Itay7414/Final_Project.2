const mongoose = require('mongoose');
const db = require('../../app'); // Assuming you have a separate App.js file

// Define the item schema
const itemSchema = new mongoose.Schema({
    type: { type: String, required: true },
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


const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            type: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ]
});

// Create the models
const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', userSchema);
const Cart = mongoose.model('Cart', cartSchema);


// Export the models
module.exports = { Item, User, Cart };
