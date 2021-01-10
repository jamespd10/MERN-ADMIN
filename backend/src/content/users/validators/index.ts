import joi from 'joi'
import { emailExpresionRegular } from '../../../constants'

export const validateSignUpBody = joi.object({
	nombre: joi.string().min(3).max(20).required().messages({
		'string.min': 'El nombre debe tener mínimo 3 caracteres',
		'string.max': 'El nombre no puede tener más de 20 caracteres',
		'string.required': 'El nombre es requerido',
	}),
	apellido: joi.string().min(3).max(20).required().messages({
		'string.min': 'El apellido debe tener mínimo 3 caracteres',
		'string.max': 'El apellido no puede tener más de 20 caracteres',
		'string.required': 'El apellido es requerido',
	}),
	usuario: joi.string().min(3).max(20).required().messages({
		'string.min': 'El usuario debe tener mínimo 3 caracteres',
		'string.max': 'El usuario no puede tener más de 20 caracteres',
		'string.required': 'El usuario es requerido',
	}),
	email: joi.string().min(3).max(50).regex(emailExpresionRegular).required().messages({
		'string.min': 'El correo debe tener mínimo 3 caracteres',
		'string.max': 'El email debe tener máximo 50 caracteres',
		'string.required': 'El correo es requerido',
	}),
	password: joi.string().min(8).max(16).required().messages({
		'string.min': 'El password debe tener mínimo 8 caracteres',
		'string.max': 'El password no puede tener más de 16 caracteres',
		'string.required': 'El password es requerido',
	}),
})