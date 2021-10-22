const Validator = require('fastest-validator');
const models = require('../models');
const jwt = require('jsonwebtoken');

function save(req, res) {
    const restaurant = {
        restaurant_name: req.body.restaurant_name,
        ubication: req.body.ubication,
        imageUrl: req.body.imageUrl,
        open_time: req.body.open_time,
        close_time: req.body.close_time,
        userId: req.userData.userId
    }

    const schema = {
        restaurant_name: { type: "string", optional: false, max: "155" },
        ubication: { type: "string", optional: false, max: "255" },
        imageUrl: { type: "string", optional: true, max: "255" },
    }

    const validate = new Validator();
    const validationResponse = validate.validate(restaurant, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Restaurant.create(restaurant).then(result => {
        res.status(201).json({
            message: "Restaurant created with success",
            restaurant: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    });
}

function show(req, res) {
    const id = req.params.id;
    models.Restaurant.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Restaurant not found"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function index(req, res) {
    models.Restaurant.findAll().then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function update(req, res) {
    const id = req.params.id;
    const updatedRestaurant = {
        restaurant_name: req.body.restaurant_name,
        ubication: req.body.ubication,
        imageUrl: req.body.imageUrl,
        open_time: req.body.open_time,
        close_time: req.body.close_time
    }

    const schema = {
        restaurant_name: { type: "string", optional: true, max: "155" },
        ubication: { type: "string", optional: true, max: "255" },
        imageUrl: { type: "string", optional: true, max: "255" },
    }

    const validate = new Validator();
    const validationResponse = validate.validate(updatedRestaurant, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    const userId = req.userData.userId;

    models.Restaurant.update(updatedRestaurant, { where: { id: id, userId: userId } }).then(result => {
        if (result) {
            res.status(200).json({
                message: "Restaurant Updated",
                updatedRestaurant: updatedRestaurant
            });
        } else {
            res.status(404).json({
                message: "Restaurant not found"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function destroy(req, res) {
    const id = req.params.id;
    const userId = req.userData.userId;

    models.Restaurant.destroy({ where: { id: id, userId: userId } }).then(result => {
        if (result) {
            models.Menu.destroy({ where: { restaurantId: id } })
            res.status(200).json({
                message: "Restaurant destroyed"
            });
        } else {
            res.status(404).json({
                message: "Restaurant not found"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function useRestaurant(req, res) {
    const id = req.params.id;

    models.Restaurant.findOne({ where: { id: id } }).then(restaurant => {
        if (restaurant == null) {
            res.status(404).json({
                message: "Restaraunt not found"
            });
        } else {
            const token = jwt.sign({
                email: req.userData.email,
                userId: req.userData.userId,
                restaurantId: restaurant.id
            }, process.env.JWT_MENU_KEY, function(err, token) {
                res.status(200).json({
                    message: "Authentication successfull",
                    token: token
                });
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong"
        })
    })
}

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy,
    useRestaurant: useRestaurant
}