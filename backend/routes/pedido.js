const express = require('express');
const pedidoController = require('../controllers/pedidos.controller');
const checkAuthUser = require('../middleware/user-auth');
const checkAuthAdmin = require('../middleware/cheack-auth');

const router = express.Router();

router.post("/user/:restaurantId", checkAuthUser.checkAuth, pedidoController.save_for_user);
router.post("/user_admin/:restaurantId", checkAuthAdmin.checkAuth, pedidoController.save_for_user);
router.get("/user/:id", checkAuthUser.checkAuth, pedidoController.show);
router.get("/user_admin/:id", checkAuthAdmin.checkAuth, pedidoController.show);
router.get("/user", checkAuthUser.checkAuth, pedidoController.index);
router.get("/user_admin", checkAuthAdmin.checkAuth, pedidoController.index);

module.exports = router;