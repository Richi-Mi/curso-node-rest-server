const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            usuarios:   '/api/usuarios',
            productos:  '/api/productos',
            categorias: '/api/categorias',
            uploads:    '/api/uploads'
        }

        // Conectar a base de Datos
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //Rutas de mi aplicacion
        this.routes()
    }
    async conectarDB() {
        await dbConnection()
    }
    middlewares() {
        //CORS
        this.app.use( cors() )
        //Parseo y lectura del boody
        this.app.use( express.json() )
        //Directorio Publico
        this.app.use(express.static('public'))
        //File Upload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'))
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'))
        this.app.use(this.paths.productos, require('../routes/productos.routes'))
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}
module.exports = Server