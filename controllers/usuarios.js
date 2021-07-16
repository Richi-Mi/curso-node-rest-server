const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGET = (req = request, res = response) => {
    const { nombre = 'No name', apikey, page = 1, limit } = req.query
    res.json({
        msg: 'get API desde el controllador',
        nombre,
        apikey,
        page,
        limit
    })
}
const usuariosPOST = async (req, res = response) => {

    const { nombre, correo, password, role } = req.body;
    const user = new Usuario( { nombre, correo, password, role } )

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if( existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })
    }
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync( password, salt )
    //Guardar en DB
    await user.save() //Guardamos en la base de datos

    res.status(201).json({
        msg: 'Confirmo, tu POST salio bien',
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