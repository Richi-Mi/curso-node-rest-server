const Role = require('../models/role')
const Usuario = require('../models/usuario')

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

module.exports = {
    esRoleValido,
    emailExiste
}