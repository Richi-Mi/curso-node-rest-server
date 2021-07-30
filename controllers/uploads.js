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
module.exports = {
    cargarArchivo,
    actualizarArchivo
}