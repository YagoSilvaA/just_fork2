const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const models = require('../models');

function signUp(req, res) {

    models.User_admin.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(409).json({
                message: "Email alredy exist"
            });
        } else {
            models.User.findOne({ where: { email: req.body.email } }).then(result => {
                if (result) {
                    res.status(409).json({
                        message: "Email alredy exist"
                    });
                } else {
                    bcryptjs.genSalt(10, function(err, salt) {
                        bcryptjs.hash(req.body.password, salt, function(err, hash) {
                            const user = {
                                user_name: req.body.user_name,
                                user_lname: req.body.user_lname,
                                email: req.body.email,
                                password: hash,
                                ubication: req.body.ubication,
                                permiso: 0,
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
                            const validationResponse = validate.validate(user, schema);

                            if (validationResponse !== true) {
                                return res.status(400).json({
                                    message: "Validation failed",
                                    errors: validationResponse
                                });
                            }

                            models.User.create(user).then(result => {
                                res.status(201).json({
                                    message: "Usuario created"
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

    models.User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user == null) {
            res.status(401).json({
                message: "Invalid credentials"
            });
        } else {
            bcryptjs.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id,
                        permiso: user.permiso,
                        restaurantId: user.restaurantId
                    }, process.env.JWT_KEY, function(err, token) {
                        res.status(200).json({
                            message: "Authentication successfull consumidor",
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
    models.User.destroy({ where: { id: id } }).then(result => {
        if (result) {
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
    if (req.body.email == undefined) {
        bcryptjs.genSalt(10, function(err, salt) {
            bcryptjs.hash(req.body.password, salt, function(err, hash) {
                const update_user = {
                    password: hash,
                    ubication: req.body.ubication,
                }

                const schema = {
                    password: { type: "string", optional: true, max: "255" },
                    ubication: { type: "string", optional: true, max: "255" },
                }

                const validate = new Validator();
                const validationResponse = validate.validate(update_user, schema);

                if (validationResponse !== true) {
                    return res.status(400).json({
                        message: "Validation failed",
                        errors: validationResponse
                    });
                }
                models.User.update(update_user, { where: { id: req.userData.userId } }).then(result => {
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
    } else {
        models.User_admin.findOne({ where: { email: req.body.email } }).then(result => {
            if (result) {
                res.status(409).json({
                    message: "Email alredy exist"
                });
            } else {
                models.User.findOne({ where: { email: req.body.email } }).then(result => {
                    if (result) {
                        res.status(409).json({
                            message: "Email alredy exist",
                        });
                    } else {
                        bcryptjs.genSalt(10, function(err, salt) {
                            bcryptjs.hash(req.body.password, salt, function(err, hash) {
                                const update_user = {
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
                                const validationResponse = validate.validate(update_user, schema);

                                if (validationResponse !== true) {
                                    return res.status(400).json({
                                        message: "Validation failed",
                                        errors: validationResponse
                                    });
                                }
                                models.User.update(update_user, { where: { id: req.userData.userId } }).then(result => {
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
}

function getPermission(req, res) {
    const id = req.userData.userId;
    models.User.findOne({ where: { id: id, permiso: req.userData.permiso } }).then(result => {
        if (result) {
            res.status(200).json(result.user_name + " " + result.user_lname);
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        })
    })
}

function getUserData(req, res) {
    const id = req.userData.userId;
    models.User.findOne({ where: { id: id, permiso: req.userData.permiso } }).then(result => {
        if (result) {
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
    signUp: signUp,
    login: login,
    destroy: destroy,
    update: update,
    getPermission: getPermission,
    getUserData: getUserData
}