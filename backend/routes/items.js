const router = require('express').Router();
const itemsController = require('../controllers/itemsControllers');


router.post('/items/createItems', itemsController.createItems);
router.get('/items/getItemsByName', itemsController.getItemByName);
router.get('/items/getItems', itemsController.getItems);
router.get('/items/getItemsByType', itemsController.getItemsByType);
/*router.get('/item/AvgSales', itemsController.AvgSales);
router.get('/item/AllProfits', itemsController.AllProfits);
router.get('/item/AvgProfits', itemsController.AvgProfits);*/


module.exports = router;