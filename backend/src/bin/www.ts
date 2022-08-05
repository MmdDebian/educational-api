import config from 'config';
import logger from '../utils/logger';
import app from '../app' ;

process.on('uncaughtException' , (err)=>{
    console.error('uncaughtException ' + err);
    logger.error(err)
});

process.on('unhandledRejection' , (err)=>{
    console.error('unhandled rejection ' + err);
    logger.error(err)
});


const port = config.get('http_port') || 3001 ;
app.listen(port , ()=>{
    console.clear();
    console.log(process.version);
    logger.info(`app runing on port ${port}` , {port});
    console.log(`app started at http://localhost:${port}`);
})