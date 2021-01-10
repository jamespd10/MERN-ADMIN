import { NextFunction, Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import env from '../env';
import { AppError } from '../lib';
import { userApi } from '../content/users';

export default async(app: Express)=>{

	app.use(
		cors({
			credentials: true,
			exposedHeaders: ['set-cookie'],
			origin: [env.clientUrl],
		})
	)

	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(mongoSanitize());
	app.use(userApi('/usuarios'));

	app.use((error: AppError, _: Request, res: Response, __: NextFunction) => {
		return res.status(error.statusCode || 500).json({
			isError: true,
			message: error.error || error.message || 'Oooops! Algo salío mal',
			errors: error.validationErrors,
		});
	});

	app.use((req: Request, res: Response) => {
		return res
			.status(404)
			.send(`${req.method} ${req.originalUrl} no existe en este servidor`);
	});
}