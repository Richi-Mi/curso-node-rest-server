const Role = require('../models/role')

const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne({ role }) 
    if( !existeRole ) {
        throw new Error(`El role ${role} no esta registrado en la base de datos`)
    }
}
module.exports = {
    esRoleValido
}