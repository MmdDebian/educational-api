import { PrismaClient, User } from '@prisma/client' ;
import { IUpdateUser } from '../../lib/interfaces';

class Service extends PrismaClient{

    getUserById = async (id:string)=>{
        return new Promise<User | null>((resolve, reject) => {
            this.user.findUnique({where : {id:id}})
            .then((found)=>{
                if(!found)return resolve(null);
                resolve(found)
            })
            .catch((err)=>reject(err))
        })
    }

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

export default new Service ;