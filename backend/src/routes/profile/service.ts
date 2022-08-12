import { PrismaClient, User } from '@prisma/client' ;
import { IUpdateUser } from '../../lib/interfaces';

class Service extends PrismaClient{

    getUserById = async (id:string):Promise<User | null>=>{
        return await this.user.findUnique({where : {id:id}});
    }

    updateUser = async (user:User , body:IUpdateUser):Promise<User | null>=>{
        return await this.user.update({where : {id : user.id} , data:body});
    }

    deleteAvatar = async (user:User):Promise<Object | string>=>{
        return await this.user.update({where : {id : user.id} , data : {avatar : 'https://api.realworld.io/images/smiley-cyrus.jpeg'}});
    }
}

export default new Service ;