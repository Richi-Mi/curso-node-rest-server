//Routes
const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { 
        usuariosGET, 
        usuariosPOST, 
        usuariosPUT, 
        usuariosPATCH, 
        usuariosDELETE 
    } = require('../controllers/usuarios')
const Role = require('../models/role')
const router = Router()

router.get('/', usuariosGET)

router.post('/', [ //Haciendo validaciones con check() de expressvalidator
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength({ min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    // check('role', 'No es un rol perimitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), verificamos si el valor de role es algunon de estos 2

    check('role').custom( async (role = '') => {
        const existeRole = await Role.findOne({ role }) 
        if( !existeRole ) {
            throw new Error(`El role ${role} no esta registrado en la base de datos`)
        }
    }),

    validarCampos
],usuariosPOST)

router.put('/:id', usuariosPUT)

router.patch('/', usuariosPATCH)

router.delete('/', usuariosDELETE)

module.exports = router