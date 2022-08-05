import { Course, PrismaClient, User } from "@prisma/client";
import { IUpdateUser, IUser } from "../../lib/interfaces";

class Service extends PrismaClient{
    getAll = async ()=>{
        return new Promise<User[]>((resolve, reject) => {
            this.user.findMany({}).then(users=>resolve(users));
        })
    }

    getById = async (id:string)=>{
        return new Promise<User | null>((resolve, reject) => {
            this.user.findUnique({where : {id : id}})
            .then((user)=>{
                if(!user)return resolve(null);
                resolve(user)
            })
            .catch((err)=>reject(err))
        })
    }

    getByEmail = async (email:string)=>{
        return new Promise<User | null>((resolve, reject) => {
            this.user.findUnique({where : {email : email}})
            .then((user)=>{
                if(!user)return resolve(null);
                resolve(user)
            })
            .catch((err)=>reject(err))
        })
    }

    create = async (body:IUser)=>{
        return new Promise<User>((resolve, reject) => {
            this.user.create({data:body}).then(user=>resolve(user));
        })
    }

    update = async (id:string , body:IUpdateUser)=>{
        return new Promise<User>((resolve, reject) => {
            this.user.update({where : {id : id} , data : body}).then(user=>resolve(user))
        })
    }

    deleteUser = async (id:string)=>{
        return new Promise<any>((resolve, reject) => {
            this.user.delete({where : {id : id}}).then(()=>resolve('deleted user'))
            .catch((err)=>reject(err))
        })
    }
}

export default new Service