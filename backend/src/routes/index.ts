import {Router} from 'express' ;
import auth from './auth/';
import admin from './admin/';
import user from './user/';
import course from './course/';
import errors from '../middlewares/error';


const router = Router();


router.use('/auth' , auth);
router.use('/user' ,user);
router.use('/admin' , admin);
router.use('/course' , course);
router.use(errors);



export default router ;