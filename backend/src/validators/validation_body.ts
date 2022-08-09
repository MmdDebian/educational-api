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

export function createUser_validate(){
    return [
        // check email
        check('email' , 'email is required').notEmpty(),
        check('email' , 'email is inValid').isEmail() ,

        // chech password 
        check('password' , 'password is required').notEmpty(),
    ]
}


export function createCourse_vlidate(){
    return [
        // check email
        check('title' , 'title is required').notEmpty(),
        check('description' , 'description is required').notEmpty(),
        check('price' , 'price is required').notEmpty(),
        check('title' , 'title is required').notEmpty(),
    ]
}


export function comment_validate(){
    return [
        // check comment
        check('content' , 'content is required').notEmpty(),
    ]
}

export function file_validate(){
    return [
        // check file
        check('file' , 'file is required').notEmpty(),
    ]
}