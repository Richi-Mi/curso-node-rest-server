const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generarJWT')

const login = async (req, res) => {
    const { correo, password } = req.body

    try {
        //Verificar si email existe
        const usuario = await Usuario.findOne({ correo })
        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -- correo'
            })
        }
        //Verificar si el usuario esta activo o eliminado
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -- estado'
            })
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password )

        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos -- password'
            })
        }
        //Generar JWT
        const token = await generarJWT( usuario.id )

        // Enviamos una respuesta
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Ups, ha habido un error'
        })
    }
}

module.exports = {
    login
}