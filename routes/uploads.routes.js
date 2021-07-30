const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarArchivoSubir } = require('../middlewares')
const { coleccionesPermitidas } = require('../helpers')
const { cargarArchivo, actualizarArchivo, mostrarImagen } = require('../controllers/uploads')

const router = Router()

router.post('/', validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,

    check('id', 'El id debe ser un ID de MongoDB').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),

    validarCampos
], actualizarArchivo)

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser un ID de MongoDB').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'] ) ),

    validarCampos
], mostrarImagen)

module.exports = router