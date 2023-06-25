const router = require('express').Router();
const artworkController = require('../controllers/itemsController');


router.post('/item/createitem', artworkController.createArtwork);
router.post('/item/updateitem', artworkController.updateArtworks);
router.post('/item/getitems', artworkController.getArtworks);
router.get('/item/AllSales', artworkController.AllSales);
router.get('/item/AvgSales', artworkController.AvgSales);
router.get('/item/AllProfits', artworkController.AllProfits);
router.get('/item/AvgProfits', artworkController.AvgProfits);


module.exports = router;