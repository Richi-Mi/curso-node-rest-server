const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGET = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    
    // const usuarios = await Usuario.find({ estado: true })
    //     .skip( Number(desde) )
    //     .limit( Number(limite) )
    // const total = await Usuario.countDocuments({ estado: true }) 
    
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments({ estado: true }), //cuenta cuantos documentos hay en la db
        Usuario.find({ estado: true })
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]) //Manda un arreglo con todas las promesas que se ejecuten
    res.json({
        total,
        usuarios
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
    res.json(usuario)
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