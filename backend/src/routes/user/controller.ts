import { Request , Response } from 'express';
import { IUpdateUser, IUser } from '../../lib/interfaces';
import service from './service';
import response from '../../utils/response';
import _ from 'lodash' ;
import { unlink } from 'fs';
import { hashPassword } from '../../lib/bcrypt';


export async function getAllUsers(req:Request , res:Response) {
    
    const users = await service.getAll()

    const result = users.map(user=>{
        return _.pick(user , ['name' , 'email' , 'avatar' , 'isAdmin'])
    })
    
    response(res , {
        data : result
    })
}


export async function getUserById(req:Request , res:Response) {
    const id = req.params.id ;
    
    const user = await service.getById(id)

    if(!user){
        return response(res, {
            message : 'user is not Found' ,
            status : 404
        })
    }

    response(res, {
        data : _.pick(user , ['id' , 'email' , 'bio' , 'avatar' , 'isAdmin'])
    })
}


export async function createUser(req:Request , res:Response) {
    let {name,email,password} = req.body ;

    const user = await service.getByEmail(email);

    if(user){
        return response(res, {
            message : 'user is registerd' , 
            status : 409
        })
    }

    password = await hashPassword(password);

    const data:IUser = {
        name ,
        email ,
        password ,
    }

    const newUser = await service.create(data)

    response(res, {
        message : 'success created user' , 
        data : _.pick(newUser , ['name','email','avatar','bio'])
    })
}

export async function updateUser(req:Request , res:Response) {
    const id = req.params.id ;
    const user = await service.getById(id);

    if(!user){
        return response(res , {
            message : 'user is not found',
            status : 404
        })
    }

    let { name ,email, password , isAdmin } = req.body ; 

    if(password){
        password = await hashPassword(password);
    }
    else{
        password = user.password ;
    }
    
    let data:IUpdateUser = {
        name ,
        email , 
        password ,
        isAdmin ,
    }
    
    const result = await service.update(id , data);

    response(res, {
        message : 'success updated' ,
        data : _.pick(result , ['name' , 'email' ,'bio' , 'avatar' ,'isAdmin'])
    })
}

export async function deleteUser(req:Request , res:Response) {
    const id = req.params.id ; 
    const user = await service.getById(id);

    if(!user){
        return response(res , {
            message : 'user is not found',
            status : 404
        })
    }

    let filePath = `${process.cwd()}/public/${user.avatar}`
    unlink(filePath , (err)=>{
        console.error('no such file in path')
    })

    service.deleteUser(id).then(()=>response(res, {message : 'success deleted'}))
}