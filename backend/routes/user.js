const express = require('express');
const userController = require('../controllers/user.controller');
const checkAuth = require('../middleware/cheack-auth');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.delete('/destroy', checkAuth.checkAuth, userController.destroy);
router.patch('/update', checkAuth.checkAuth, userController.update);
router.get('/permission', checkAuth.checkAuth, userController.getPermission);
router.get('/data', checkAuth.checkAuth, userController.getUserData);

module.exports = router;