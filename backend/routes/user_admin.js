const express = require('express');
const user_adminController = require('../controllers/user_admin.controller');
const checkAuth = require('../middleware/cheack-auth');

const router = express.Router();

router.post('/sign-up', user_adminController.signUp);
router.post('/login', user_adminController.login);
router.delete('/destroy', checkAuth.checkAuth, user_adminController.destroy);
router.patch('/update', checkAuth.checkAuth, user_adminController.update);
router.get('/permission', checkAuth.checkAuth, user_adminController.getPermission);
router.get('/data', checkAuth.checkAuth, user_adminController.getUserData);
router.get('/resId', checkAuth.checkAuth, user_adminController.getMyRestaurantId);

module.exports = router;