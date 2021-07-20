//Routes
const { Router } = require('express')

const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')
const { 
        usuariosGET, 
        usuariosPOST, 
        usuariosPUT, 
        usuariosPATCH, 
        usuariosDELETE 
    } = require('../controllers/usuarios')

const router = Router()

router.get('/', usuariosGET)

router.post('/', [ 
    //Haciendo validaciones con check() de expressvalidator
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letras').isLength({ min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ), 
    // check('role', 'No es un rol perimitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), verificamos si el valor de role es algunon de estos 2
    check('role').custom( esRoleValido ),

    validarCampos

],usuariosPOST)

router.put('/:id', [

    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRoleValido ),

    validarCampos
    
], usuariosPUT)

router.patch('/', usuariosPATCH)

router.delete('/', usuariosDELETE)

module.exports = router