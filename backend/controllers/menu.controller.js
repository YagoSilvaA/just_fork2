const Validator = require('fastest-validator');
const models = require('../models');

function save(req, res) {
    if (req.userData.permiso == 0) {
        return res.status(400).json({
            message: "No tiene los permisos"
        })
    } else {
        const menu = {
            menu_name: req.body.menu_name,
            precio: req.body.precio,
            imageUrl: req.body.imageUrl,
            restaurantId: req.userData.restaurantId,
            userId: req.userData.userId
        }

        const schema = {
            menu_name: { type: "string", optional: false },
            precio: { type: "number", optional: false },
            imageUrl: { type: "string", optional: true, max: "255" },
        }

        const validate = new Validator();
        const validationResponse = validate.validate(menu, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

        models.Menu.create(menu).then(result => {
            res.status(201).json({
                message: "Menu created with success",
                menu: result
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
    const restaurant_id = req.params.id;
    models.Menu.findAll({ where: { restaurantId: restaurant_id } }).then(result => {
        if (result == "") {
            res.status(404).json({
                message: "Menu not found"
            });
        } else {
            res.status(200).json(result);
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function select(req, res) {
    const restaurantId = req.params.restaurantId;
    const id = req.params.id;
    models.Menu.findOne({ where: { id: id, restaurantId: restaurantId } }).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Dish not found"
            })
        }
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
        const id = req.params.id;
        const userId = req.userData.userId;
        const restaurantId = req.userData.restaurantId;

        const updatedMenu = {
            menu_name: req.body.menu_name,
            precio: req.body.precio,
            imageUrl: req.body.imageUrl
        }

        const schema = {
            menu_name: { type: "string", optional: true, max: "155" },
            precio: { type: "number", optional: true },
            imageUrl: { type: "string", optional: true, max: "255" },
        }

        const validate = new Validator();
        const validationResponse = validate.validate(updatedMenu, schema);

        if (validationResponse !== true) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validationResponse
            });
        }

        models.Menu.update(updatedMenu, { where: { id: id, userId: userId, restaurantId: restaurantId } }).then(result => {
            if (result) {
                res.status(200).json({
                    message: "Menu Updated",
                    updatedRestaurant: updatedMenu
                });
            } else {
                res.status(404).json({
                    message: "Menu not found"
                })
            }
        }).catch(error => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            })
        });
    }
}

function destroy(req, res) {
    if (req.userData.permiso == 0) {
        return res.status(400).json({
            message: "No tiene los permisos"
        })
    } else {
        const id = req.params.id;
        const userId = req.userData.userId;
        const restaurantId = req.userData.restaurantId;

        models.Menu.destroy({ where: { id: id, userId: userId, restaurantId: restaurantId } }).then(result => {
            if (result) {
                res.status(200).json({
                    message: "Menu destroyed"
                });
            } else {
                res.status(404).json({
                    message: "Menu not found"
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

module.exports = {
    save: save,
    show: show,
    select: select,
    update: update,
    destroy: destroy
}