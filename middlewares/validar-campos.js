const { validationResult } = require('express-validator')

const validarCampos = ( req, res, next ) => {
    //Verificamos si el correo introducido contiene errores
    const errors = validationResult(req)
    if( !errors.isEmpty() ) {
        return res.status(400).json(errors)
    }

    next() //next() funcion de un middleware que se va a ejecutar si este no da errores y pasa al siguiente middleware
}
module.exports = {
    validarCampos
}