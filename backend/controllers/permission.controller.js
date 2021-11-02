function permissionCheck(req, res) {
    if (req.userData.permiso == 0) {
        return res.status(400).json({
            message: "No tiene los permisos"
        })
    } else {
        return res.status(200).json({
            message: "Tiene los permismos para utilizar la ruta"
        })
    }
}

module.exports = {
    permissionCheck: permissionCheck
}