import { Response } from 'express';


// response function [the send data and message (status by default 200)]
export default function response(res:Response , {message="" , data={} , status=200}){
    res.status(status).json({
        message ,
        data
    })
}