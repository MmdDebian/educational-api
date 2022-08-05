import multer from 'multer' ;
import mkdir from 'mkdirp' ;


const storage = multer.diskStorage({
    destination : (req , file ,cb)=>{
        mkdir('public/uploads').then(made=>{
            cb(null  , 'public/uploads')
        })
    } ,

    filename : (req,file , cb)=>{
        cb(null , Date.now() +'-'+file.originalname)
    }
});


const upload = multer({storage : storage});

export default upload ;

