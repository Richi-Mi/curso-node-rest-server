const { Role, Usuario, Categoria } = require('../models/index')

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
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria
}