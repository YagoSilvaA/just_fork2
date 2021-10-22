const jwt = require('jsonwebtoken');

function menuAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; //get token
        const decodedToken = jwt.verify(token, process.env.JWT_MENU_KEY);
        req.restaurantData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: error
        });
    }
}

module.exports = {
    menuAuth: menuAuth
}