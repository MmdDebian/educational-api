import express, { Router } from 'express' ;
import checkFile from '../../middlewares/checkFile';
import isAuth from '../../middlewares/isAuth';
import upload from '../../uploads/config';
import * as controller from './controller'
const router = Router();

router.use(isAuth);
router.get('/' , controller.profile);
router.put('/' , upload.single('avatar') ,controller.updateUser);
router.delete('/avatar' , controller.deleteAvatar);

export default router ;