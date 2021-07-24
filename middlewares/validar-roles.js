const esAdminRole = ( req, res, next ) => {
    if( !req.usuarioAuth) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }
    const { role, nombre } = req.usuarioAuth

    if( role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es un administrador`
        })
    }

    next()
}
const tieneRole = ( ...roles ) => {
    return ( req, res, next ) => {

        if( !req.usuarioAuth) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }
        if(!roles.includes( req.usuarioAuth.role )) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })
        }
        next()
    }
}
module.exports = {
    esAdminRole,
    tieneRole
}