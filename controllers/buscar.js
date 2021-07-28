const { ObjectId } = require('mongoose').Types

const { Usuario, Categoria, Producto } = require('../models/index')

const coleccionesPermitidas = [
    'usuario',
    'categoria',
    'producto',
    'roles'
]

const buscarUsuarios = async (termino = '', res) => {
    const esMongoID = ObjectId.isValid( termino ) // TRue

    if( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.status(200).json({
            results: ( usuario ) ? [ usuario ] : []
        })
    }
    const regexp = new RegExp( termino, 'i' )

    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regexp }, { correo: regexp }], 
        $and: [ { estado: true } ]
     })
    res.status(200).json({
        results: usuarios
    })
} 
const buscarCategorias = async (termino = '', res) => {
    const esMongoID = ObjectId.isValid( termino ) // TRue

    if( esMongoID ) {
        const categoria = await Categoria.findById(termino);
        return res.status(200).json({
            results: ( categoria ) ? [ categoria ] : []
        })
    }
    const regexp = new RegExp( termino, 'i' )

    const categorias = await Categoria.find({ 
        $and: [ { estado: true }, { nombre: regexp } ],
    })
    res.status(200).json({
        results: categorias
    })
}
const buscarProductos = async (termino = '', res ) => {
    const esMongoID = ObjectId.isValid( termino ) // TRue

    if( esMongoID ) {
        const producto = await Producto.findById(termino);
        return res.status(200).json({
            results: ( producto ) ? [ producto ] : []
        })
    }
    const regexp = new RegExp( termino, 'i' )

    const productos = await Producto.find({ 
        $and: [ { estado: true }, { nombre: regexp } ],
    })
    res.status(200).json({
        results: productos
    })
}
const buscar = (req, res) => {
    const { coleccion, termino } = req.params

    if( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuario':
            buscarUsuarios(termino, res)
        break;
        case 'producto':
            buscarProductos(termino, res)
        break;        
        case 'categoria':
            buscarCategorias(termino, res)
        break;
        default:
            res.status(500).json({
                msg: ' Se me olvido hacer esta coleccion jiji'
            })
        break;
    }
}

module.exports = { buscar }