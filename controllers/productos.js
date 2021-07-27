const { Producto, Categoria, Usuario } = require('../models/index')

const obtenerProductos = (req, res) => {
    res.send('Obtenemos los productos')
}
const obtenerProducto = (req, res) => {
    res.send('Obtenemos un producto')
}
const crearProducto = async (req, res) => {
    let { nombre, precio, descripcion, categoria } = req.body
    categoria = categoria.toUpperCase()

    const [ categoriaDB, productoDB ] = await Promise.all([
        Categoria.findOne({ nombre: categoria }).populate('usuario', 'nombre'),
        Producto.findOne({ nombre })
    ])

    if( productoDB ) {
        return res.status(400).json({
            msg: 'El producto ya existe, mejor actualizelo'
        })
    }

    if( !categoriaDB ) {
        return res.status(400).json({
            msg: 'La categoria no existes'
        })
    }

    const data = {
        categoria: categoriaDB._id,
        nombre,
        precio,
        descripcion,
        usuario: req.usuarioAuth._id
    }

    const producto = await new Producto( data )
    await producto.save()

    res.status(201).json({
        producto
    })
}
const actualizarProducto = (req, res) => {
    res.send('Actualizamos producto')
}
const eliminarProducto = (req, res) => {
    res.send('Eliminamos un producto')
}
module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}