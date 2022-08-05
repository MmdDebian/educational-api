import express, { Router } from 'express' ;
import validate from '../../validators/validate';
import { login_validate, register_validate } from '../../validators/validation_body';
import * as controller from './controller';
const router = Router();

router.post(
    '/register' , 
    register_validate() ,
    validate ,
    controller.register
);

router.post(
    '/login' ,
    login_validate(),
    validate ,
    controller.login
);

export default router ;