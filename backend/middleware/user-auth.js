const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; //get token
        const decodedToken = jwt.verify(token, process.env.JWT_US_KEY);
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token user",
            error: error
        });
    }
}

module.exports = {
    checkAuth: checkAuth
}