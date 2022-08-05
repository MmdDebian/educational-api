import { PrismaClient, User } from '@prisma/client';
import { IUser } from '../../lib/interfaces';
import jwt from 'jsonwebtoken';
import config from 'config' ;



export default new class service extends PrismaClient {
    // generate token 
    createToken = async (user:User):Promise<string>=>{
        return new Promise(async(success, error)=>{
            const token = await jwt.sign({userId:user.id} , config.get('jwt_key') , {expiresIn : '2d'});
            return success(token) ;
        })
    }

    // create user servise
    createUser = async (user:IUser):Promise<User>=>{
        return new Promise((success , error)=>{
            this.user.create({data:user})
            .then((data)=>{
                return success(data);
            })
        })
    }

    // get user by email service 
    getUserFromEmail = async (email:string):Promise<User | null>=>{
        return new Promise((found , not_found)=>{
            this.user.findUnique({where: {email : email}})
            .then((user)=>{
                if(user == null) return found(null)
                return found(user)
            })
            .catch((err)=>{
                not_found(true);
            })
        })
    }
}