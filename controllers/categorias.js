const { Categoria } = require('../models')

// Obtener categorias - paginado - total - populate
const obtenerCategorias = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query), //cuenta cuantos documentos hay en la db
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ]) //Manda un arreglo con todas las promesas que se ejecuten
    res.status(200).json({
        total,
        categorias
    })
}
// Obtener categoria - populate {devuelve categoria}
const obtenerCategoria = async (req, res) => {
    const { id } = req.params

    const categoria = await Categoria.findById( id ).populate('usuario')

    res.status(200).json({
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
    const { id } = req.params
    const { usuario,  estado, ...data } = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuarioAuth._id

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true } )
    res.status(202).json({
        categoria
    })
}

// Borrar categoria - estado: false
const borrarCategoria = async (req, res) => {
    const { id } = req.params
    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } )

    res.status(200).json({
        categoria
    })
}

module.exports = {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}