// Otimizamos a mensagem que error será enviada ao usuário caso ocorra um erro

import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
    [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, request, response, text) => {
    // Erros de validação
    if (error instanceof ValidationError){
        let errors: ValidationErrors = {}

        error.inner.forEach(err => {
            errors[err.path] = err.errors
        })

        return response.status(400).json({ message: 'Validation Fails', errors})
    }

    // Erros internos
    console.log(error)

    return response.status(500).json({ message: "Internal server error"})
}

export default errorHandler