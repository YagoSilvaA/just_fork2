const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const models = require('../models');

function signUp(req, res) {

    models.User.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(409).json({
                message: "Email alredy exist"
            });
        } else {
            models.User_admin.findOne({ where: { email: req.body.email } }).then(result => {
                if (result) {
                    res.status(409).json({
                        message: "Email alredy exist",
                    });
                } else {
                    bcryptjs.genSalt(10, function(err, salt) {
                        bcryptjs.hash(req.body.password, salt, function(err, hash) {
                            const user_admin = {
                                user_name: req.body.user_name,
                                user_lname: req.body.user_lname,
                                email: req.body.email,
                                password: hash,
                                ubication: req.body.ubication,
                                permiso: 1,
                                restaurantId: 0
                            }

                            const schema = {
                                user_name: { type: "string", optional: false, max: "155" },
                                user_lname: { type: "string", optional: false, max: "155" },
                                email: { type: "string", optional: false, max: "255" },
                                password: { type: "string", optional: false, max: "255" },
                                ubication: { type: "string", optional: false, max: "255" },
                            }

                            const validate = new Validator();
                            const validationResponse = validate.validate(user_admin, schema);

                            if (validationResponse !== true) {
                                return res.status(400).json({
                                    message: "Validation failed",
                                    errors: validationResponse
                                });
                            }

                            models.User_admin.create(user_admin).then(result => {
                                res.status(201).json({
                                    message: "User created"
                                });
                            }).catch(error => {
                                res.status(500).json({
                                    message: "Something went wrong",
                                    error: error
                                });
                            });

                        })
                    })
                }
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            })
        }
    })
}

function login(req, res) {

    const loginUser = {
        email: req.body.email,
        password: req.body.password
    }

    const schema = {
        email: { type: "string", optional: false, max: "255" },
        password: { type: "string", optional: false, max: "255" },
    }

    const validate = new Validator();
    const validationResponse = validate.validate(loginUser, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.User_admin.findOne({ where: { email: req.body.email } }).then(user_admin => {
        if (user_admin == null) {
            res.status(401).json({
                message: "Invalid credentials"
            });
        } else {
            bcryptjs.compare(req.body.password, user_admin.password, function(err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: user_admin.email,
                        userId: user_admin.id,
                        permiso: user_admin.permiso,
                        restaurantId: user_admin.restaurantId
                    }, process.env.JWT_KEY, function(err, token) {
                        res.status(200).json({
                            message: "Authentication successfull",
                            token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid credential"
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong"
        })
    })
}

function destroy(req, res) {
    const id = req.userData.userId;
    models.User_admin.destroy({ where: { id: id } }).then(result => {
        if (result) {
            models.Menu.destroy({ where: { userId: id } })
            models.Restaurant.destroy({ where: { userId: id } })
            models.Pedido.destroy({ where: { userId: id } })
            res.status(200).json({
                message: "User destroyed"
            });
        } else {
            res.status(404).json({
                message: "User not found"
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
    models.User.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(409).json({
                message: "Email alredy exist"
            });
        } else {
            models.User_admin.findOne({ where: { email: req.body.email } }).then(result => {
                if (result) {
                    res.status(409).json({
                        message: "Email alredy exist",
                    });
                } else {
                    bcryptjs.genSalt(10, function(err, salt) {
                        bcryptjs.hash(req.body.password, salt, function(err, hash) {
                            const update_admin = {
                                email: req.body.email,
                                password: hash,
                                ubication: req.body.ubication,
                            }

                            const schema = {
                                email: { type: "string", optional: true, max: "255" },
                                password: { type: "string", optional: true, max: "255" },
                                ubication: { type: "string", optional: true, max: "255" },
                            }

                            const validate = new Validator();
                            const validationResponse = validate.validate(update_admin, schema);

                            if (validationResponse !== true) {
                                return res.status(400).json({
                                    message: "Validation failed",
                                    errors: validationResponse
                                });
                            }

                            models.User_admin.update(update_admin, { where: { id: req.userData.userId } }).then(result => {
                                res.status(201).json({
                                    message: "User updated"
                                });
                            }).catch(error => {
                                res.status(500).json({
                                    message: "Something went wrong",
                                    error: error
                                });
                            });

                        })
                    })
                }
            }).catch(error => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error
                });
            })
        }
    })
}

module.exports = {
    signUp: signUp,
    login: login,
    destroy: destroy,
    update: update
}