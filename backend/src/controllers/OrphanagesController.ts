import { Request, Response } from 'express'
/* 
    O ORM usa um pattern chamadao Repositiory Pattern. No qual
    as regras de manipulação da tabela fica dentro de um repositório
*/
import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanages' //Importando o model
import orphanageView from  '../views/orphanages_view'
import * as Yup from 'yup'

export default {
    async index(request: Request, response: Response) {
        const orphanageRepository = getRepository(Orphanage)

        const orphanages = await orphanageRepository.find({
            relations: ['images']
        })

        return response.json(orphanageView.renderMany(orphanages))
    },

    async show(request: Request, response: Response) {
        const { id } = request.params
        const orphanageRepository = getRepository(Orphanage)
        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images']
        })
        return response.json(orphanageView.render(orphanage))
    },

    async create(request: Request, response: Response) {
        //console.log(request.files)
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
    
        } = request.body
    
        const orphanageRepository = getRepository(Orphanage)

        const requestImages = request.files as Express.Multer.File[]
        // 'Express.Multer.File' server para dizer que aquilo é um Array de arquivos
        const images = requestImages.map(image => {
            return { path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends == 'true',
            images
        }

        // Esquema de validação
        const schema = Yup.object().shape({
            name: Yup.string().required(), // string, obrigatório
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300), // Aceita no máximo 300 caracteres
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.string().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        // Aplicando a validação nos dados
        await schema.validate(data, {
            abortEarly: false
            // Não irá abortar assim que encontrar  oprimerio erro. Assim, todos
            // os erros serão exibidos.
        })
    
        const orphanage = orphanageRepository.create(data) // Criando um orfanato
    
        await orphanageRepository.save(orphanage) // Salvando o orfanato no banco de dados
    
        // O status http 201 significa que algo foi criado com sucesso.
        return response.status(201).json(orphanage)
    }
}