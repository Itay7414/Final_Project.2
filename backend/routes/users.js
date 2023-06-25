const router = require('express').Router();
const usersController = require('../controllers/usersController');


router.post('/users/signIn', usersController.signIn_user);
router.put('/users/updateUser', usersController.updateUser);
router.post('/users/signUp', usersController.signUp_user);
router.get('/users/allUsers', usersController.allUsers);



module.exports = router;