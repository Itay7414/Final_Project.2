const router = require('express').Router();
const ordersControllers = require('../controllers/ordersControllers');


//router.post('/orders/createOrder', ordersControllers.createOrder);
router.post('/orders/addToOrder', ordersControllers.addToOrder);
// router.post('/Orders/addToOrder', ordersControllers.updatedOrder);

module.exports = router;

