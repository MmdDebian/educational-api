import { Router } from 'express' ;
import checkFile from '../../middlewares/checkFile';
import isAdmin from '../../middlewares/isAdmin';
import isAuth from '../../middlewares/isAuth';
import upload from '../../uploads/config';
import validate from '../../validators/validate';
import { createCourse_vlidate, file_validate } from '../../validators/validation_body';
import { 
    addFileToCourse,
    createCourse, 
    deleteCourse, 
    deleteFileToCourse, 
    getAllCourse, 
    getById, 
    updateCourse 
} from './controller';

const router = Router();

router.get('/' , getAllCourse)
router.get('/:id' , getById);
router.post(
    '/' , 
    isAuth ,
    isAdmin , 
    upload.single('avatar') , 
    createCourse_vlidate() , 
    validate ,
    checkFile ,
    createCourse
);
router.put('/:id' , isAuth ,isAdmin , upload.single('avatar') ,updateCourse);
router.delete('/:id' , isAuth ,isAdmin , deleteCourse);
// course id for add new file 
router.post(
    '/:id/file/' , 
    isAuth , 
    isAdmin , 
    upload.single('file') ,
    addFileToCourse
);
// course file id 
router.delete('/file/:id' , isAuth , isAdmin , deleteFileToCourse);

export default router ;