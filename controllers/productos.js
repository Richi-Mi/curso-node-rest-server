const { Producto, Categoria } = require('../models/index')

const obtenerProductos = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query), 
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]) 
    res.status(200).json({
        total,
        productos
    })
}
const obtenerProducto = async (req, res) => {
    const { id } = req.params

    const producto = await Producto.findById( id ).populate('usuario', 'nombre').populate('categoria', 'nombre')
    res.status(200).json({
        msg: 'GET Product hecho',
        producto
    })
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
        nombre: nombre.toUpperCase(),
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
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params
        const { estado, categoria, ...data } = req.body
    
        data.usuario = req.usuarioAuth._id
    
        const producto = await Producto.findByIdAndUpdate( id, data, { new: true }).populate('usuario', 'nombre').populate('categoria', 'nombre')

        res.status(201).json({
            producto
        })
    } catch(err) {
        res.status(501).json({
            err
        })
    }
}
const eliminarProducto = async (req, res) => {
    const { id } = req.params
    const producto = await Producto.findByIdAndUpdate( id, { estado: false, disponible: false }, { new: true } )

    res.status(200).json({
        producto
    })
}
module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}