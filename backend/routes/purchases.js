const router = require('express').Router();
const purchasesController = require('../controllers/purchasesController');


router.post('/purchases/createPurchases', purchasesController.createPurchases);
router.post('/purchases/updatePurchases', purchasesController.updatePurchases);
router.post('/purchases/getPurchases', purchasesController.getPurchases);



module.exports = router;