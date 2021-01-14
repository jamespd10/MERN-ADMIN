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
    return prefix ? prefixedRouter.use(prefix, router) : router;
}