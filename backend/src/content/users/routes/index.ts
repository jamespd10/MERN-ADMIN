import { Router } from 'express';
import { validateRequest } from '../../../lib';
import { validateSignUpBody } from '../validators';
import { UserController } from '../index';

export default (prefix?: string) => {
    const router = Router();
    const prefixedRouter = Router();
    router.route('/signup').post(
        validateRequest(validateSignUpBody, 'body'),
        UserController.handleSignUp
    );
    router.route('/hola').get(
        UserController.handleHola
    );
    return prefix ? prefixedRouter.use(prefix, router) : router;
}