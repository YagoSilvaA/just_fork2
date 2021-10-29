const express = require('express');
const restaurantController = require('../controllers/restaurant.controller');
const checkAuthMiddleware = require('../middleware/cheack-auth');

const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, restaurantController.save);
router.get("/:id", restaurantController.show);
router.get("/", restaurantController.index);
router.get("/data/personal/", checkAuthMiddleware.checkAuth, restaurantController.getData);
router.patch("/", checkAuthMiddleware.checkAuth, restaurantController.update);
router.delete("/", checkAuthMiddleware.checkAuth, restaurantController.destroy);

module.exports = router;