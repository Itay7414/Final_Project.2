const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the item schema
const itemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

// Create the models
const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

// Export the models
module.exports = { Item, User, Order };
