const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGET = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    // const usuarios = await Usuario.find({ estado: true })
    //     .skip( Number(desde) )
    //     .limit( Number(limite) )
    // const total = await Usuario.countDocuments({ estado: true }) 

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query), //cuenta cuantos documentos hay en la db
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
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
    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json(usuario)
}

const usuariosPATCH = (req, res = response) => {
    res.json({
        msg: 'patch API desde el controllador'
    })
}
const usuariosDELETE = async (req, res = response) => {
    const { id } = req.params
    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id )

    //Simulamos que lo borramos pero en realidad lo dejamos para la integridad del sitio,
    //Si embargo ya nadie podra acceder a el
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
    const usuarioAutenticado = req.usuarioAuth

    res.json({ usuario, usuarioAutenticado })
}

module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}