import { check } from 'express-validator';

export function register_validate(){
    return [
        check('name' , 'name is required').not(),
        
        // check email
        check('email' , 'email is required').notEmpty(),
        check('email' , 'email is inValid').isEmail() ,

        // chech password 
        check('password' , 'password is required').notEmpty(),
        check('password' , 'the password is not scure').isLength({min : 5})
    ]
}

export function login_validate(){
    return [
        // check email
        check('email' , 'email is required').notEmpty(),
        check('email' , 'email is inValid').isEmail() ,

        // chech password 
        check('password' , 'password is required').notEmpty(),
    ]
}