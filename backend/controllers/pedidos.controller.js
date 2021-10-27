const Validator = require('fastest-validator');
const models = require('../models');

function save_for_user(req, res) {

    const restaurantId = parseInt(req.params.restaurantId);
    models.Restaurant.findOne({ where: { id: restaurantId } }).then(result => {
        if (result) {
            const pedido = {
                monto: req.body.monto,
                pedidosId: req.body.pedidosId,
                restaurantId: restaurantId,
                userId: req.userData.userId,
                permiso_user: req.userData.permiso
            }

            const schema = {
                monto: { type: "number", optional: false },
                pedidosId: { type: "string", optional: false, max: "255" }
            }

            const validate = new Validator();
            const validationResponse = validate.validate(pedido, schema);

            if (validationResponse !== true) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: validationResponse
                });
            }

            models.Pedido.create(pedido).then(r => {
                res.status(201).json({
                    message: "Pedido created with success",
                    pedido: r
                });
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                })
            });
        } else {
            return res.status(404).json({
                message: "Restaraunt not found"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function show(req, res) {
    const id = req.params.id;
    const userId = req.userData.userId;
    const permiso = req.userData.permiso;
    models.Pedido.findAll({ where: { id: id, userId: userId, permiso_user: permiso } }).then(result => {
        if (result == "") {
            res.status(404).json({
                message: "Pedido not found"
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

function index(req, res) {
    const userId = req.userData.userId;
    const permiso = req.userData.permiso;
    models.Pedido.findAll({ where: { userId: userId, permiso_user: permiso } }).then(result => {
        if (result == "") {
            res.status(404).json({
                message: "Pedido not found"
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

module.exports = {
    save_for_user: save_for_user,
    show: show,
    index: index
}