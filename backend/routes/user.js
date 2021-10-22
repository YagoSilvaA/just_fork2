const express = require('express');
const userController = require('../controllers/user.controller');
const checkAuth = require('../middleware/user-auth');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.delete('/destroy', checkAuth.checkAuth, userController.destroy);

module.exports = router;