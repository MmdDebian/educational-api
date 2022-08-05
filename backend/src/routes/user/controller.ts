import { Request , Response } from 'express';
import { IUpdateUser, IUser } from '../../lib/interfaces';
import service from './service';
import response from '../../utils/response';
import _, { propertyOf } from 'lodash' ;
import { unlink } from 'fs';

export async function profile(req:Request , res:Response) {
    response(res , {
        data : _.pick(req.user , ['name' , 'email' , 'avatar' , 'bio'])
    })
}


export async function updateUser(req:Request , res:Response) {
    let { name , bio  } = req.body ;

    let data:IUpdateUser = {
        name ,
        bio ,
    }

    const result = await service.updateUser(req.user , data);

    response(res, {
        message : 'successfully updated' , 
        status : 200 , 
        data : _.pick(result , ['name' , 'bio' , 'avatar'])
    })
}

export async function addAvatar(req:Request , res:Response) {

    let { avatar } = req.body ;
    
    if(!req.file){
        return avatar = null ;
    }
    else{
        console.log(req.file)
        avatar = req.file.path.replace(/\\/g ,'/').substring(6) ;
    }

    const result = await service.addAvatar(req.user , avatar);

    response(res , {
        message : 'success update avatar' ,
        data : _.pick(result , ['name' , 'bio' , 'avatar']) ,
        status : 200
    })
    
    
}

export async function deleteAvatar(req:Request , res:Response) {
    const filePath = `${process.cwd()}/public/${req.user.avatar}`
    
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