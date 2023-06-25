const router = require('express').Router();
const usersController = require('../controllers/usersControllers');

/*
router.post('/users/signIn', usersController.signIn_user);
router.put('/users/updateUser', usersController.updateUser);
router.get('/users/allUsers', usersController.allUsers);
*/
router.post('/users/signUp', usersController.signUp_user);



module.exports = router;