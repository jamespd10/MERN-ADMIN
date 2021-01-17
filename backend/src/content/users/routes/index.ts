import { Router } from 'express';
import { validateRequest } from '../../../lib';
import { UserController } from '../index';
import { validateSignUpBody } from '../validators';

export default (prefix?: string) => {
    const router = Router();
    const prefixedRouter = Router();
    //REGISTRARSE
    router.route('/signup').post(
        validateRequest(validateSignUpBody, 'body'),
        UserController.handleSignUp
    );
    //INGRESAR
    router.route('/signin').post(UserController.handleSignIn);
    //RUTA DE PRUEBA
    router.route('/hola').get(
        UserController.handleHola
    );
    //PARA CERRAR SESSION
    router.route('/salir').post(UserController.authenticate, UserController.handleSignOut)
    //PARA RECUPERAR LA SESION
    router.route('/yo').get(UserController.authenticate, UserController.handleGetMe)
    //PARA REFRSCAR EL TOKEN
    router.route('/refresh-auth').patch(
        UserController.authenticate,
        UserController.handleRefreshAuthentication
    )
    return prefix ? prefixedRouter.use(prefix, router) : router;
}