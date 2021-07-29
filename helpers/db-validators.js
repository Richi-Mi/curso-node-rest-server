const { Role, Usuario, Categoria, Producto } = require('../models/index')

const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne({ role })
    if (!existeRole) {
        throw new Error(`El role ${role} no esta registrado en la base de datos`)
    }
}

const emailExiste = async ( correo ) => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById(id)
    if( !existeUsuario ) {
        throw new Error(`El id: ${id} no existe`)
    }
} 
const existeCategoria = async ( id ) => {
    const existeCategoria = await Categoria.findById( id )
    if( !existeCategoria ) {
        throw new Error(`La categoria que inserto no existe`)
    }
}
const existeProducto = async ( id ) => {
    const existeProducto = await Producto.findById( id )
    if( !existeProducto ) {
        throw new Error(`El producto que inserto no existe`)
    }
} 
// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes( coleccion )
    if( !incluida ) {
        throw new Error(`La coleccion: ${ coleccion } no es permitida`)
    }
    return true
}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}