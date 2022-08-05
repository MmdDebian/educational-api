import { Request , Response } from 'express' ;
import { IUser } from '../../lib/interfaces';
import generateOTP from '../../utils/otp';
import response from '../../utils/response';
import service from './service';
import {compare , hashPassword} from '../../lib/bcrypt';
import _ from 'lodash';

export async function register(req:Request,res:Response){
    let { name , email , password } = req.body ;

    const user = await service.getUserFromEmail(email)

    if(user){
        return response(res, {
            message : 'email or password is not valid' ,
            status : 409
        })
    }
    
    // hash password
    password = await hashPassword(password);

    let data:IUser = {
        name ,
        email ,
        password ,
    };

    const newUser = await service.createUser(data); 

    const token = await service.createToken(newUser);

    response(res, {
        message : 'successfuly registerd' , 
        data : token
    })

}


export async function login(req:Request , res:Response) {
    
    const { email , password } = req.body ;

    const user = await service.getUserFromEmail(email);

    if(!user){
        return response(res , {
            message : 'email or password is not valid' ,
            status : 400
        })
    }

    const isValid = await compare(password , user.password);

    if(!isValid){
        return response(res , {
            message : 'email or password is not valid' ,
            status : 400
        })
    }

    const token = await service.createToken(user);

    response(res , {
        message : 'successfully logged ',
        data : token ,
    })

}