const router = require('express').Router();
const ordersControllers = require('../controllers/ordersControllers');


router.post('/orders/addToOrder', ordersControllers.addToOrder);
router.post('/orders/sumbitOrder', ordersControllers.submitOrder);

module.exports = router;

