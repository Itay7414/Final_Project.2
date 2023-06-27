const router = require('express').Router();
const cartControllers = require('../controllers/cartControllers');


router.post('/carts/createCart', cartControllers.createCart);
router.post('/carts/addToCart', cartControllers.addToCart);


module.exports = router;