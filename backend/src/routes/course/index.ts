import { Router } from 'express' ;
import isAdmin from '../../middlewares/isAdmin';
import isAuth from '../../middlewares/isAuth';
import upload from '../../uploads/config';
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
router.post('/' , isAuth ,isAdmin , upload.single('avatar') , createCourse);
router.put('/:id' , isAuth ,isAdmin , upload.single('avatar') ,updateCourse);
router.delete('/:id' , isAuth ,isAdmin , deleteCourse);
// course id for add new file 
router.post('/file/:id' , isAuth , isAdmin , upload.single('file') , addFileToCourse);
// course file id 
router.delete('/file/:id' , isAuth , isAdmin , deleteFileToCourse);

export default router ;