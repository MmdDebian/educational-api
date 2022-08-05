import { PrismaClient, User } from '@prisma/client' ;
import { IUpdateUser } from '../../lib/interfaces';

export default new class Service extends PrismaClient{

    updateUser = async (user:User , body:IUpdateUser):Promise<User | null>=>{
        return new Promise((success , error)=>{
            this.user.update({where : {id : user.id} , data:body})
            .then(result=>{
                success(result)
            })
            .catch((err)=>{
                error(err)
            })
        })
    }

    addAvatar = async (user:User,filePath:string):Promise<Object | null>=>{
        return new Promise((success , error)=>{
            this.user.update({where : {id : user.id} , data:{avatar : filePath}})
            .then(result=>{
                success(result)
            })
            .catch(err=>{
                error(err)
            })
        })
    }

    deleteAvatar = async (user:User):Promise<Object | string>=>{
        return new Promise((resolve , reject)=>{
            this.user.update({where : {id : user.id} , data : {avatar : 'https://api.realworld.io/images/smiley-cyrus.jpeg'}})
            .then((result)=>{
                resolve(result)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }
}