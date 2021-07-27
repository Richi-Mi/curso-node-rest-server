const { Categoria } = require('../models')

// Obtener categorias - paginado - total - populate
const obtenerCategorias = async (req, res) => {
    res.send('Obtener categorias')
}
// Obtener categoria - populate {devuelve categoria}
const obtenerCategoria = async (req, res) => {
    const { id } = req.params
    const categoria = await Categoria.findById( id )


    res.json({
        categoria
    })
}

// Crear Categoria
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

// Actualizar Categoria
const actualizarCategoria = async (req, res) => {
    res.send('Actualizamos las categorias')
}

// Borrar categoria - estado: false
const borrarCategoria = async (req, res) => {
    res.send('Borrar categoria')
}
module.exports = {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}