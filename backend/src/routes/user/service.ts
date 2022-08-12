import { Course, PrismaClient, User } from "@prisma/client";
import { IUpdateUser, IUser } from "../../lib/interfaces";

class Service extends PrismaClient{
    getAll = async ():Promise<User[]>=>{
        return await this.user.findMany({})
    }

    getById = async (id:string):Promise<User | null>=>{
        return this.user.findUnique({where : {id : id}})
    }

    getByEmail = async (email:string):Promise<User | null>=>{
        return await this.user.findUnique({where : {email : email}}) ;
    }

    create = async (body:IUser):Promise<User>=>{
        return await this.user.create({data:body});
    }

    update = async (id:string , body:IUpdateUser):Promise<User>=>{
        return await this.user.update({where : {id : id} , data : body});
    }

    deleteUser = async (id:string):Promise<any>=>{
        return await this.user.delete({where : {id : id}});
    }
}

export default new Service