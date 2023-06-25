const router = require('express').Router();
const itemController = require('../controllers/itemsController');


router.post('/item/createItem', itemsController.createItem);
router.post('/item/updateItem', itemsController.updateItems);
router.post('/item/getItems', itemskController.getArtItems);
router.get('/item/AllSales', itemsController.AllSales);
router.get('/item/AvgSales', itemsController.AvgSales);
router.get('/item/AllProfits', itemsController.AllProfits);
router.get('/item/AvgProfits', itemsController.AvgProfits);


module.exports = router;