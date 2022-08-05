import {Router} from 'express' ;
import auth from './auth/';
import user from './user/'
import profile from './profile/';
import course from './course/';
import comment from './comment';
import errors from '../middlewares/error';
const router = Router();


router.use('/auth' , auth);
router.use('/profile' ,profile);
router.use('/user' ,user);
router.use('/course' , course);
router.use('/comment' , comment);
router.use(errors);



export default router ;