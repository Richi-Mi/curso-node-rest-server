const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT, tieneRole } = require('../middlewares/index')

const { 
        obtenerCategorias,
        crearCategoria,
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria 
    } = require('../controllers/categorias')

const { existeCategoria } = require('../helpers/db-validators')

const router = Router()

// Obtener todas las categorias
router.get('/', obtenerCategorias)

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'Tiene que ser un ID valido de MongoDB').isMongoId(),
    check('id').custom(existeCategoria),

    validarCampos
], obtenerCategoria)

//Crear categoria - privado - cualquiera persona con un token valido
router.post('/', [
    validarJWT,

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),

    validarCampos
], crearCategoria)

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,

    check('id', 'Tiene que ser un ID valido de MongoDB').isMongoId(),
    check('id').custom(existeCategoria),

    validarCampos
], actualizarCategoria)

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE'),

    check('id', 'Tiene que ser un ID valido de MongoDB').isMongoId(),
    check('id').custom(existeCategoria),

    validarCampos
], borrarCategoria )

module.exports = router