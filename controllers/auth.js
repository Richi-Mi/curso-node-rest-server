const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const { generarJWT } = require('../helpers/generarJWT')
const { googleVerify } = require('../helpers/google-verify')

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
const googleSignIn = async (req, res) => {
    const { id_token } = req.body
    try {

        const { correo, nombre, img } = await googleVerify( id_token )

        let usuario = await Usuario.findOne({ correo })

        if( !usuario ) {
            //Tengo que crearlo
            const data = {
                nombre, 
                correo,
                password: ':P',
                img,
                google: true
            }

            usuario = new Usuario( data )

            await usuario.save()
        }
    
        // SI el usuario en DB
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el ADMIN :P'
            })
        }

        // Generar JWT
        const token = await generarJWT( usuario.id )

        res.json({
            msg: 'Todo Ok! google signin',
            token,
            usuario
        })

    } catch(err) {
        res.status(400).json({
            msg: 'token de google no valido'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}