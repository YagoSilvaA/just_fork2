const Validator = require('fastest-validator');
const models = require('../models');

function save(req, res) {
    if (req.userData.permiso == 0) {
        return res.status(400).json({
            message: "No tiene los permisos"
        })
    } else if (req.userData.restaurantId != 0) {
        return res.status(409).json({
            message: "Ya tiene un restaurante asociado a su perfil"
        })
    } else {
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
            const user_admin = {
                restaurantId: result.id
            }
            models.User_admin.update(user_admin, { where: { id: req.userData.userId } })
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
    if (req.userData.permiso == 0) {
        return res.status(400).json({
            message: "No tiene los permisos"
        })
    } else {
        const id = req.userData.restaurantId;
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
            if (result != 0) {
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
}

function destroy(req, res) {
    if (req.userData.permiso == 0) {
        return res.status(400).json({
            message: "No tiene los permisos"
        })
    } else {
        const id = req.userData.restaurantId;
        const userId = req.userData.userId;

        models.Restaurant.destroy({ where: { id: id, userId: userId } }).then(result => {
            if (result) {
                const user_admin = {
                    restaurantId: 0
                }
                models.User_admin.update(user_admin, { where: { id: userId } })

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
}

function getData(req, res) {
    const id = req.userData.restaurantId;
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

module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy,
    getData: getData
}