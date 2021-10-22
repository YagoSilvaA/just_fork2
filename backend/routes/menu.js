const express = require('express');
const menuController = require('../controllers/menu.controller');
const menuAuth = require('../middleware/menu-auth');

const router = express.Router();

router.post("/", menuAuth.menuAuth, menuController.save);
router.get("/:id", menuController.show);
router.get("/:restaurantId/:id", menuController.select);
router.patch("/:id", menuAuth.menuAuth, menuController.update);
router.delete("/:id", menuAuth.menuAuth, menuController.destroy);

module.exports = router;