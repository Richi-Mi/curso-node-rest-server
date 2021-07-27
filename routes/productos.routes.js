const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares/index')
const { esRoleValido, emailExiste, existeUsuarioPorId }     = require('../helpers/db-validators')

const router = Router()

router.get('/', (req, res) => {
    res.send('HOLA PRODUCTOS')
})

module.exports = router