import { Request , Response , NextFunction } from 'express'
import response from '../utils/response'

export default function isAdmin(req:Request,res:Response,next:NextFunction){
    if(!req.user.isAdmin){
        return response(res ,{
            message : 'access denied' ,
            status : 401
        })   
    }

    next()
}