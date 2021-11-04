const express = require('express');
const permissionController = require('../controllers/permission.controller');
const checkAuthMiddleware = require('../middleware/cheack-auth');
const router = express.Router();

router.get("/", checkAuthMiddleware.checkAuth, permissionController.permissionCheck);
router.get("/my-permiso", checkAuthMiddleware.checkAuth, permissionController.getUserPermiso);
module.exports = router;