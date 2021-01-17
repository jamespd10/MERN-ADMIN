import { Schema, model, Model, Document, HookNextFunction } from 'mongoose';
import { MongooseSchemaDefinition } from '../../../typings';
import { emailExpresionRegular } from '../../../constants/';
import bcryptjs from 'bcryptjs';
import { AppError } from '../../../lib';

//
const userCodeSchema = {
	value: String,
	expiration: Date,
}
//
export interface IUserCode {
	value: string
	expiration: Date
}
//define los datos que tendrá el objeto schema del usuario
export interface IUsuario {
    id: string
    nombre: string
    apellido: string
    usuario: string
    email: string
    password: string
    isEmailVerified: boolean
	refreshToken?: string
	emailVerificationCode?: IUserCode
	passwordResetCode?: IUserCode
    timestamps: {
        createdAt: Date
        updatedAt: Date
    }
}

//define el schema por separado de manera 
//estricta con respecto a la interface anterior
const schemaDefinition: MongooseSchemaDefinition<IUsuario> = {
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    usuario: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
        match: emailExpresionRegular
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 16,
        trim: true,
    },
    isEmailVerified: {
		type: Boolean,
		default: false,
	},
	emailVerificationCode: {
		type: userCodeSchema,
	},
	passwordResetCode: {
		type: userCodeSchema,
	},
	refreshToken: String,
}
//se define el esquema dado el anterior y se transforma 
//de modo que devuelva solo los datos que se quieren mostrar
const userSchema = new Schema(schemaDefinition, {
    id: true,
    toObject: {
        virtuals: true,
        transform: (_: IUserDocument, obj: IUsuario) => ({
            ...obj,
            password: undefined,
            refreshToken: undefined,
			emailVerificationCode: undefined,
            passwordResetCode: undefined,
            timestamps: undefined,
            isEmailVerified: undefined,
            _id: undefined,
            __v: undefined,
        }),
    },
    timestamps: {
        createdAt: 'timestamps.createdAt',
        updatedAt: 'timestamps.updatedAt',
    },
});
//para encriptar la contraseña antes de ser guardada
userSchema.pre('save', async function (
    this: IUserDocument,
    next: HookNextFunction
) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 8);
    }

    next();
});
//
export interface IDoesEmailExistOptions {
    throwIfExists?: boolean
}
//para validar si el correo está en uso
userSchema.statics.isEmailInUse = async function
    (
        this: IUserModel,
        email: string,
        { throwIfExists = true }: IDoesEmailExistOptions = { throwIfExists: true, }
    ): Promise<boolean> {
    const user = await this.findOne({ email, });
    if (user && throwIfExists)
        throw new AppError(`"${email}" ya está en uso`, 400);
    return !!user;
}
//
export interface IUserDocument extends IUsuario, Document {
    id: string
}
//
export interface IUserModel extends Model<IUserDocument> {
    isEmailInUse(email: string): Promise<boolean>
}
//se exporta el modelo
export default model<IUserDocument, IUserModel>('User', userSchema);