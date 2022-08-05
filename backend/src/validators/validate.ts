import { validationResult } from 'express-validator';
import { NextFunction, Request , Response} from 'express';
import response from '../utils/response';


function validationBody(req:Request,res:Response):boolean{
    const errors = validationResult(req) ;

    if(!errors.isEmpty()){
        response(res , {
            message : 'validation error' ,
            status : 400 ,
            data : errors.array().map(err=>err.msg),
        })

        return false ;
    }

    return true ;
}


export default function validate(req:Request,res:Response, next:NextFunction){
    if(!validationBody(req,res)){
        return ;
    }

    next()
}