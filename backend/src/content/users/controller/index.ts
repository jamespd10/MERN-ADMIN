import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { AppError, sendMail } from '../../../lib';
import { IUserDocument, IUsuario } from '../model';
import env from '../../../env';
import { UserModel } from '..';

export const handleSignUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await UserModel.isEmailInUse(req.body.email);
        const newUser = await UserModel.create(req.body);
        await sendMail(
            req.body.email,
            'Saludo de bienvenida - Stack MERN',
            `Bienvenido ${req.body.email}`,
        );
        return res.send('Marca fren');
    } catch (error) {
        return next(error);
    }
}

export const handleHola = async (
    _: Request,
    res: Response,
) => {
    //return res.status(req.user ? 200 : 401).json(req.user?.toObject())
    return res.send('Marca fren');
}

declare module 'express' {
    interface Request {
        user?: IUserDocument
    }
}