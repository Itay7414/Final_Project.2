const router = require('express').Router();
const cartControllers = require('../controllers/cartControllers');


router.post('/carts/createCart', cartControllers.createCart);



module.exports = router;