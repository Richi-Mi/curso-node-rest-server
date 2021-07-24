const JWT = require('jsonwebtoken')

const Usuario = require('../models/usuario')

const validarJWT = async ( req, res, next ) => {
    const token = req.header('x-token')

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const { uid } = JWT.verify( token, process.env.SECRETKEY )
        
        //Leer el usuario que corresponde al uuid
        const usuarioAuth = await Usuario.findById( uid )

        if( !usuarioAuth ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            })
        }

        // Verificar si el uid tiene estado en true
        if( !usuarioAuth.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            })
        }
        req.usuarioAuth = usuarioAuth 

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}