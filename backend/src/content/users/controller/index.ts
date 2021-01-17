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
//PARA CERRAR SESSION
export const handleSignOut = async (req: Request, res: Response) => {
	await UserModel.findByIdAndUpdate(req.user?.id, { refreshToken: undefined })
	return res
		.clearCookie('jwt', {
			httpOnly: true,
			secure: false,
		})
		.clearCookie('refreshToken', { httpOnly: true, secure: false })
		.end()
}
//RUTA DE PRUEBA
export const handleHola = async (
    _: Request,
    res: Response,
) => {
    //return res.status(req.user ? 200 : 401).json(req.user?.toObject())
    return res.send('Marca fren');
}
//No se para que es este :v
export const handleGetMe = (req: Request, res: Response) => {
	return res.status(req.user ? 200 : 401).json(req.user?.toObject())
}
//PARA VERIFICAR LA SESION
export const authenticate = async (
	req: Request,
	_: Response,
	next: NextFunction
) => {
	try {
		const { jwt: jwtCookie } = req.cookies
		if (!jwtCookie) {
			return next(new AppError('No estás autenticado', 401))
		}

		const { user } = jwt.verify(jwtCookie, env.auth.jwtSecret, {
			ignoreExpiration: ['/usuarios/refresh-auth'].includes(req.originalUrl),
		}) as {
			user: IUsuario
			iat: number
			exp: number
		}

		const userDocument = await UserModel.findById(user.id)
		if (!userDocument) {
			return next(new AppError('No estás autenticado', 401))
		}

		req.user = userDocument
		next()
	} catch (error) {
		return next(new AppError(error.error || error.message, 401))
	}
}
//REFESCAR EL TOKEN
export const handleRefreshAuthentication = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.cookies.refreshToken || !req.user || !req.user.refreshToken) {
			return next(new AppError('No estás auntenticado', 401))
		}

		const isCodeValid = await bcryptjs.compare(
			req.cookies.refreshToken,
			req.user.refreshToken
		)

		if (!isCodeValid) {
			return next(new AppError('No estás autenticado', 401))
		}

		const payload = jwt.verify(
			req.cookies.refreshToken,
			env.auth.jwtSecret
		) as IRefreshTokenPayload

		if (payload.ip !== req.ip) {
			return res
				.status(401)
				.clearCookie('jwt', {
					httpOnly: true,
					secure: false,
				})
				.clearCookie('refreshToken', {
					httpOnly: true,
					secure: false,
				})
				.end()
		}

		const newAuthorizationToken = await generateJwt(req.user.toObject())
		return res
			.status(200)
			.cookie('jwt', newAuthorizationToken, { httpOnly: true, secure: false })
			.end()
	} catch (error) {
		return next(error)
	}
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