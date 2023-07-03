const router = require('express').Router();
const usersController = require('../controllers/usersControllers');


router.post('/users/signIn', usersController.signIn);
router.post('/users/signUp', usersController.signUp);
router.get('/users/logout', usersController.logout);


module.exports = router;