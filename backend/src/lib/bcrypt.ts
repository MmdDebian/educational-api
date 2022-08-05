import * as bcrypt from 'bcrypt' ;

// hashed password function
export async function hashPassword(password:string):Promise<string>{
    return new Promise((success , error)=>{
        bcrypt.genSalt(12 , (err , salt)=>{
            if(err) return error(err);
            bcrypt.hash(password , salt)
            .then((hash)=>{
                return success(hash)
            })
            .catch((err)=>{
                error(err)
            })
        })
    })
}


// compare password 
export async function compare(password:string , hash:string):Promise<boolean>{
    return new Promise((valid , not_valid)=>{
        bcrypt.compare(password , hash)
        .then((same)=>{
            if(!same) return valid(false);
            valid(true);
        })
        .catch((err)=>{
            valid(false)
        })
    })
}