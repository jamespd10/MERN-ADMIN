import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { AppError, sendMail } from '../../../lib';
import { IUserDocument, IUsuario } from '../model';
import env from '../../../env';
import { UserModel } from '..';

//RUTA DE REGISTRAR
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
//RUTA DE INGRESAR
export const handleSignIn = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { usuario, password } = req.body;
        const user = await UserModel.findOne({
            usuario
        });
        if (!user)
            throw new AppError('Credenciales inválidas', 400);
        const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
        );
        if (!isPasswordValid)
            throw new AppError('Credenciales inválidas', 400);
        const authResult = await generateAuthenticationResult(user, req.ip)
        return sendAuthResponse(res, authResult)
        //return res.send('bien');
    }
    catch (error) {
        next(error);
    }
}
//RUTA DE PRUEBA
export const handleHola = async (
    _: Request,
    res: Response,
) => {
    //return res.status(req.user ? 200 : 401).json(req.user?.toObject())
    return res.send('Marca fren');
}
//GENERAR AUTENTICACION
export const generateAuthenticationResult = async (
    userDocument: IUserDocument,
    ip: string
): Promise<IAuthenticationResult> => {
    const user = userDocument
    const payload: IRefreshTokenPayload = { ip }
    const refreshToken = jwt.sign(payload, env.auth.jwtSecret, {
        expiresIn: '365 days',
    })

    //user.refreshToken = await bcryptjs.hash(refreshToken, 4)
    await user.save({ validateBeforeSave: false })
    const authenticationToken = await generateJwt(user.toObject())
    return {
        user: user.toObject(),
        jwt: authenticationToken,
        refreshToken,
    }
}
//GENERAR JWT
export const generateJwt = async (user: IUsuario): Promise<string> => {
    return jwt.sign({ user }, env.auth.jwtSecret, { expiresIn: 60 * 15 })
}
//INTERFACES
export interface IAuthenticationResult {
    user: IUsuario
    jwt: string
    refreshToken: string
}
export interface IRefreshTokenPayload {
    ip: string
}
//SETEAR COOKIES DE SESION
export const sendAuthResponse = (
    res: Response,
    authResult: IAuthenticationResult,
    isSignUp = false
) => {
    return res
        .status(isSignUp ? 201 : 200)
        .cookie('jwt', authResult.jwt, {
            httpOnly: true,
            secure: false,
        })
        .cookie('refreshToken', authResult.refreshToken, {
            httpOnly: true,
            secure: false,
        })
        .json(authResult.user)
}
//EXPORTAR COMO MODULO
declare module 'express' {
    interface Request {
        user?: IUserDocument
    }
}