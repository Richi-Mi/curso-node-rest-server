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
    const user = new Usuario({ nombre, correo, password, role })

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
    //Guardar en DB
    await user.save() //Guardamos en la base de datos

    res.status(201).json({
        msg: 'Confirmo, tu POST salio bien',
        user
    })
}

const usuariosPUT = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body
    //TODO: Validar contra base de datos

    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }
    //Con esto encontramos el usuario y lo actualizamos en la  DB
    const usuario = await Usuario.findByIdAndUpdate( id, resto )
    res.json({
        msg: 'PUT realizado correctamente',
        usuario
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