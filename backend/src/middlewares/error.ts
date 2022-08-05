import { Request , Response , ErrorRequestHandler, NextFunction} from 'express';
import logger from '../utils/logger';
import response from '../utils/response';

function errors(err:ErrorRequestHandler , req:Request , res:Response , next:NextFunction){
    logger.error(err);
    response(res , {
        message : 'internet server error' , 
        status : 500
    })
}

export default errors ;