import { Request , Response , NextFunction } from 'express';
import { unlink } from 'fs';
import path from 'path';
import response from '../utils/response';

export default function checkFile(req:Request,res:Response,next:NextFunction){
    if(!req.file){
        return next();
    }

    let fileTypes = ['.png','.jpeg','.jpg'];
    
    if(!fileTypes.includes(path.extname(req.file.filename))){
        let filePath = `${process.cwd()}/${req.file.path}`;
        
        unlink(filePath , (err)=>{
            console.error('can not file');
        })

        response(res, {
            message : 'the file is inavild',
            status : 400
        })
    }

    next()
}