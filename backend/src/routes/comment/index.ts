import { Router } from 'express' ;
import isAuth from '../../middlewares/isAuth';
import validate from '../../validators/validate';
import { comment_validate } from '../../validators/validation_body';
import { addComment , deleteComment } from './controller'
const router = Router()


router.use(isAuth);
router.post(
    '/:id' ,
    comment_validate(),
    validate ,
    addComment
);
router.delete('/:id' ,deleteComment);


export default router ;