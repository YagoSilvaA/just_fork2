const express = require('express');
const menuController = require('../controllers/menu.controller');
const checkAuth = require('../middleware/cheack-auth');

const router = express.Router();

router.post("/", checkAuth.checkAuth, menuController.save);
router.get("/:id", menuController.show);
router.get("/:restaurantId/:id", menuController.select);
router.patch("/:id", checkAuth.checkAuth, menuController.update);
router.delete("/:id", checkAuth.checkAuth, menuController.destroy);

module.exports = router;