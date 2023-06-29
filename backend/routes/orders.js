const router = require('express').Router();
const ordersControllers = require('../controllers/ordersControllers');


router.post('/Orders/createOrder', ordersControllers.createOrder);
router.post('/Orders/addToOrder', ordersControllers.addToOrder);
// router.post('/Orders/addToOrder', ordersControllers.updatedOrder);

module.exports = router;

