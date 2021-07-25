const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    uid: {
        type: String,
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
        // enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})
//Removemos __v y password para que no se vean en un JSON
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject()
    //Generar el uid
    usuario.uid = _id

    return usuario 
}
module.exports = model('Usuario', UsuarioSchema)