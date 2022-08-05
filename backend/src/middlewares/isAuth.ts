import { Request , Response , NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import { PrismaClient, User } from '@prisma/client' ;
import response from '../utils/response';

const User = new PrismaClient().user ;

export default async function isAuth(req:Request , res:Response , next:NextFunction) {
    const token:any= req.headers['x-auth-token'];

    if(!token){
        return response(res ,{
            message : 'access denied' ,
            status : 401
        })   
    }
    try{
        const decode:any = await jwt.verify(token , config.get('jwt_key'));
        const user = await User.findUnique({where : {id : decode.userId}});


        console.log(user);

        if(!user){
            throw new Error('access denied')
        }

        req.user = user ; 
        next()
    }
    catch(err){
        return response(res ,{
            message : 'access denied' ,
            status : 401
        })   
    }
}