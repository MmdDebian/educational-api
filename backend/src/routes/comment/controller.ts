import { Request , Response } from 'express';
import _ from 'lodash';
import { IComment } from '../../lib/interfaces';
import response from '../../utils/response';
import service from './service';


export async function addComment(req:Request ,res:Response) {
    const id = parseInt(req.params.id) ; 
    const { content } = req.body ;
    const course = await service.findCourse(id);

    if(!course){
        return response(res, {
            message : "course is not found",
            status : 404
        })
    }

    const data:IComment = {
        content : content , 
        userId : req.user.id , 
        courseId : course.id 
    }

    const result = await service.addComment(data)

    response(res, {
        message : 'successfully added comment' , 
        data : {
            user : _.pick(req.user , ['name' , 'email' , 'bio' , 'avatar']),
            comment : result.content            
        }
    })
}


export async function deleteComment(req:Request ,res:Response) {
    const id = parseInt(req.params.id) ; 

    service.deleteComment(id)
    .then(()=>{
        response(res, {
            message : 'successfully deleted'
        })
    })
}