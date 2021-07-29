const { subirArchivo } = require('../helpers')

const cargarArchivo = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir' })
        return
    }
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
    const { id, coleccion } = req.params
    res.json({
        id,
        coleccion,
        mgs: 'PUT archivo'
    })
}
module.exports = {
    cargarArchivo,
    actualizarArchivo
}