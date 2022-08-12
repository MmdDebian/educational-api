import { PrismaClient, User } from '@prisma/client';
import { IUser } from '../../lib/interfaces';
import jwt from 'jsonwebtoken';
import config from 'config' ;



export default new class service extends PrismaClient {
    // generate token 
    createToken = async (user:User):Promise<string>=>{
        return await jwt.sign({userId:user.id}, config.get('jwt_key') , {expiresIn : '15d'})
    }

    // create user servise
    createUser = async (user:IUser):Promise<User>=>{
        return await this.user.create({data:user});
    }

    // get user by email service 
    getUserFromEmail = async (email:string):Promise<User | null>=>{
        return await this.user.findUnique({where : {email : email}});
    }
}