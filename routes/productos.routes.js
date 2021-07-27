const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares/index')
const { esRoleValido, existeProducto } = require('../helpers/db-validators')

const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productos')

const router = Router()

router.get('/', obtenerProductos)

router.get('/:id', [
    // Revisamos que el ID del producto sea valido, y que exista
    check('id', 'Tiene que ser un ID valido de MongoDB').isMongoId(),
    check('id').custom(existeProducto),

    validarCampos
], obtenerProducto)

router.post('/', [

    validarJWT,

    // Revisamos los datos que queremos insertar en la DB
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio debe ser un numero').isNumeric(),
    check('descripcion', 'Tiene que tener una descripcion').not().isEmpty(),
    check('categoria', 'Tiene que insertar la categoria del producto').not().isEmpty(),

    validarCampos

], crearProducto)

router.put('/:id', [
    validarJWT,

    // Revisamos que el ID del producto sea valido, y que exista
    check('id', 'Tiene que ser un ID valido de MongoDB').isMongoId(),
    check('id').custom(existeProducto),

    // Revisamos los datos que queremos actualizar
    check('disponible', 'El disponible tiene que ser booleano').isBoolean(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio debe ser un numero').isNumeric(),
    check('descripcion', 'Tiene que tener una descripcion').not().isEmpty(),

    // Validamos todos los campos, y se hay errores paramosel programa
    validarCampos
], actualizarProducto)

router.delete('/:id', [
    validarJWT,

    // Revisamos que el ID del producto sea valido, y que exista
    check('id', 'Tiene que ser un ID valido de MongoDB').isMongoId(),
    check('id').custom(existeProducto),

    // Validamos todos los campos, y se hay errores paramosel programa
    validarCampos
], eliminarProducto)

module.exports = router