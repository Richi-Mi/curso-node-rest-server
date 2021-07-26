const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT } = require('../middlewares/index')
const { crearCategoria } = require('../controllers/categorias')

const router = Router()

// Obtener todas las categorias
router.get('/', (req, res) => {
    res.send('GET')
})
// Obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.send('GET ID')
})
//Crear categoria - privado - cualquiera persona con un token valido
router.post('/', [
    validarJWT,

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),

    validarCampos
], crearCategoria)
// Actualizar - privado - cualquiera con token valido
router.put('/:id', (req, res) => {
    res.send('PUT')
})
// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.send('Delete')
})
module.exports = router