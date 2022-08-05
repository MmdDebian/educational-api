import express, { Router } from 'express' ;
import isAdmin from '../../middlewares/isAdmin';
import isAuth from '../../middlewares/isAuth';
import validate from '../../validators/validate';
import { createUser_validate } from '../../validators/validation_body';
import * as controller from './controller'
const router = Router();

router.use(isAuth , isAdmin);
router.get('/' , controller.getAllUsers);
router.get('/:id' , controller.getUserById);
router.post(
    '/' ,
    createUser_validate() ,
    validate , 
    controller.createUser
);
router.put('/:id' , controller.updateUser);
router.delete('/:id' , controller.deleteUser);


export default router ;