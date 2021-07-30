const path = require('path')

const { v4: uuidv4 } = require('uuid')

const subirArchivo = ({ files }, carpeta = '', extensionesValidas = ['png', 'jpeg', 'jpg', 'gif']) => {
    return new Promise( (resolve, reject) => {
        if(files === undefined) {
            return reject('No hay archivos en la peticion')
        }
        const { archivo } = files
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]
    
        // Validar la extension
        if( !extensionesValidas.includes( extension ) ) {
            return reject(`La extension ${extension} no es permitida`)
        }
    
        const nombreTemp = uuidv4() + '.' + extension
        const uploadPath = path.join(__dirname, '/../uploads/', carpeta, nombreTemp)
    
        archivo.mv(uploadPath, (err) => {
            if(err) {
                return reject(err)
            }
            resolve( nombreTemp )
        })
    } )
}

module.exports = {
    subirArchivo
}