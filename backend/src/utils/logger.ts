import winston , {format} from "winston";

const logger = winston.createLogger({
    level : 'info' ,
    format : format.json() ,
    transports : [
        new winston.transports.File({filename : 'error.log' , level : 'error'}) ,
        new winston.transports.File({filename : 'combined.log'}) ,
    ]   
});


if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
}


export default logger ;