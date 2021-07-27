const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares/index')
const { esRoleValido, emailExiste, existeUsuarioPorId }     = require('../helpers/db-validators')

const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productos')

const router = Router()

router.get('/', obtenerProductos)

router.get('/:id', obtenerProducto)

router.post('/', [

    validarJWT,

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio debe ser un numero').isNumeric(),
    check('descripcion', 'Tiene que tener una descripcion').not().isEmpty(),
    check('categoria', 'Tiene que insertar la categoria del producto').not().isEmpty(),

    validarCampos

], crearProducto)

router.put('/:id', actualizarProducto)

router.delete('/:id', eliminarProducto)

module.exports = router