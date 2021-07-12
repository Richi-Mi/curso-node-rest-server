const { response, request } = require('express')

const usuariosGET = (req = request, res = response) => {
    const { query } = req
    res.json({
        msg: 'get API desde el controllador',
        query
    })
}
const usuariosPOST = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.json({
        msg: 'Confirmo, tu POST salio bien',
        nombre,
        edad
    })
}
const usuariosPUT = (req, res = response) => {
    const { id } = req.params
    res.json({
        msg: 'put API desde el controllador',
        id
    })
}
const usuariosPATCH = (req, res = response) => {
    res.json({
        msg: 'patch API desde el controllador'
    })
}
const usuariosDELETE = (req, res = response) => {
    res.json({
        msg: 'delete API desde el controllador'
    })
}
module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}