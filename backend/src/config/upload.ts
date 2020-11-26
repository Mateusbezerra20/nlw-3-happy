// Configuração de como os uploads serão feitos na aplicação
import multer from 'multer'
import path from 'path' //Usado para caminhos relativos

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`

            callback(null, fileName) // callback(<erro>, <resultado>)
        }
    })
}