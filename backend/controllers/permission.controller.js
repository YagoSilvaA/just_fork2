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

function getUserPermiso(req, res) {
    if (req.userData.permiso == 1 || req.userData.permiso == 0) {
        return res.status(200).json({
            permiso: req.userData.permiso
        })
    } else {
        return res.status(404).json({
            message: "No se encontro su información"
        })
    }
}

module.exports = {
    permissionCheck: permissionCheck,
    getUserPermiso: getUserPermiso
}