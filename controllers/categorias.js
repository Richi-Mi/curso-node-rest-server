const { Categoria } = require('../models')

const crearCategoria = async (req, res) => {
    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({ nombre })

    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe `
        })
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuarioAuth._id
    }

    const categoria = await new Categoria( data )
    await categoria.save()

    res.status(201).json({
        categoria
    })
}

module.exports = {
    crearCategoria
}