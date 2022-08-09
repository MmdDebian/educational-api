import config from 'config' ;
import { Request , Response } from 'express';
import { IUpdateUser, IUser } from '../../lib/interfaces';
import service from './service';
import response from '../../utils/response';
import _ from 'lodash' ;
import { unlink } from 'fs';
import { hashPassword } from '../../lib/bcrypt';

export async function profile(req:Request , res:Response) {
    response(res , {
        data : _.pick(req.user , ['name' , 'email' , 'avatar' , 'bio' , 'isAdmin'])
    })
}


export async function updateUser(req:Request , res:Response) {
    let { name , bio , password, avatar } = req.body ;
    let user = await service.getUserById(req.user.id);

    if(!user){
        return response(res, {
            message : 'access denied' ,
            status : 401
        })
    }

    if(password){
        password = await hashPassword(password);
    }
    else{
        password = req.user.password ;
    }

    let data:IUpdateUser = {
        name ,
        bio ,
        password , 
    }
    
    if(req.file){
        const previousFile = `${process.cwd()}/public/${user.filePath}` ;
        unlink(previousFile , (err)=>{
            console.error('no souch file in path')
        });

        const newPath = req.file.path.replace(/\\/g,'/').substring(6);
        avatar = `${config.get('host')}/${newPath}`;
        data.avatar = avatar ;
    }

    const result = await service.updateUser(req.user , data);

    response(res, {
        message : 'successfully updated' , 
        status : 200 , 
        data : _.pick(result , ['name' , 'bio', 'email' , 'avatar'])
    })
}


export async function deleteAvatar(req:Request , res:Response) {
    const filePath = `${process.cwd()}/public/${req.user.filePath}`
    console.log(filePath)
    unlink(filePath , (err)=>{
        console.error('can not delete file')
    })

    service.deleteAvatar(req.user)
    .then(()=>{
        response(res , {
            message : 'successfully deleted avatar' ,
        })
    })
}