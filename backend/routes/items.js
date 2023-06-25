const router = require('express').Router();
const artworkController = require('../controllers/itemsController');


router.post('/item/createItem', itemController.createItem);
router.post('/item/updateItem', itemController.updateItems);
router.post('/item/getItems', itemkController.getArtItems);
router.get('/item/AllSales', itemController.AllSales);
router.get('/item/AvgSales', itemController.AvgSales);
router.get('/item/AllProfits', itemController.AllProfits);
router.get('/item/AvgProfits', itemController.AvgProfits);


module.exports = router;