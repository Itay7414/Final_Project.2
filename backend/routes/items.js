const router = require('express').Router();
const itemsController = require('../controllers/itemsControllers');


router.post('/item/createItem', itemsController.createItems);
//router.post('/item/updateItem', itemsController.updateItems);
router.get('/item/getItems', itemsController.getItems);
router.get('/item/getItemsByType', itemsController.getItemsByType);
/*router.get('/item/AvgSales', itemsController.AvgSales);
router.get('/item/AllProfits', itemsController.AllProfits);
router.get('/item/AvgProfits', itemsController.AvgProfits);*/


module.exports = router;