const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL )

const { subirArchivo } = require('../helpers')
const { Usuario, Producto } = require('../models')

const cargarArchivo = async (req, res) => {
    try {
        // Imagenes
        const nombre = await subirArchivo(req, 'imgs', undefined)

        res.status(201).json({
            nombre
        })
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }

}

const actualizarArchivo = async (req, res) => {
    try {
        const { id, coleccion } = req.params

        let modelo
    
        switch ( coleccion ) {
            case 'usuarios':
                modelo = await Usuario.findById(id)
    
                if(!modelo) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id: ${id}`
                    })
                }
            break;
    
            case 'productos':
                modelo = await Producto.findById(id)
    
                if(!modelo) {
                    return res.status(400).json({
                        msg: `No existe un Producto con el id: ${id}`
                    })
                }
            break;
        
            default:
                return res.status(500).json({ msg: 'Se me olvido validar esto' })
        }
        // Limpiar imagenes previas
        if ( modelo.img ) {
            // Hay que borrar la imagen del servidor
            const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img )
            if( fs.existsSync( pathImagen ) ) { // Verificamos si existe el archivo
                fs.unlinkSync( pathImagen ) // Eliminamos el archivo
            }
        } 
        modelo.img = await subirArchivo(req, coleccion, undefined)
    
        await modelo.save()
    
        res.status(201).json({
            modelo
        })
    } catch(err) {
        res.status(400).json({
            err
        })
    }
}

const mostrarImagen = async (req, res) => {
    try {
        const pathImage404 = path.join( __dirname, '../assets/no-image.jpg')
        const { id, coleccion } = req.params

        let modelo
    
        switch ( coleccion ) {
            case 'usuarios':
                modelo = await Usuario.findById(id)
    
                if(!modelo) {
                    return res.status(400).json( {
                        msg: `El id: ${id} no es valido`
                    } )
                }
            break;
    
            case 'productos':
                modelo = await Producto.findById(id)
    
                if(!modelo) {
                    return res.status(400).json( {
                        msg: `El id: ${id} no es valido`
                    } )
                }
            break;
        
            default:
                return res.status(500).json({ msg: 'Se me olvido validar esto' })
        }
        // Limpiar imagenes previas
        if ( modelo.img ) {
            // Hay que borrar la imagen del servidor
            const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img )
            if( fs.existsSync( pathImagen ) ) { // Verificamos si existe el archivo
                return res.status(200).sendFile( pathImagen )
            }
        } 
        res.status(404).sendFile( pathImage404 )
    } catch(err) {
        res.status(400).json({
            err
        })
    }
}
const actualizarArchivoCloudinary = async (req, res) => {
    try {
        const { id, coleccion } = req.params

        let modelo
    
        switch ( coleccion ) {
            case 'usuarios':
                modelo = await Usuario.findById(id)
    
                if(!modelo) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id: ${id}`
                    })
                }
            break;
    
            case 'productos':
                modelo = await Producto.findById(id)
    
                if(!modelo) {
                    return res.status(400).json({
                        msg: `No existe un Producto con el id: ${id}`
                    })
                }
            break;
        
            default:
                return res.status(500).json({ msg: 'Se me olvido validar esto' })
        }
        // Limpiar imagenes previas
        if ( modelo.img ) {
            const nombreArr = modelo.img.split('/')
            const nombre    = nombreArr[ nombreArr.length - 1 ]
            const [ public_id ] = nombre.split('.')

            await cloudinary.uploader.destroy( public_id )
        } 
        const { tempFilePath } = req.files.archivo
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath ) //Con esto subimos una imagen
    
        modelo.img = secure_url

        await modelo.save()

        res.status(201).json({
            modelo
        })
    } catch(err) {
        res.status(400).json({
            err
        })
    }
}
module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarImagen,
    actualizarArchivoCloudinary 
}