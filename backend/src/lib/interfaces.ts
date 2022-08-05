export interface IUser {
    name : string | null
    email : string 
    password : string 
    verify_code : string | null  
}


export interface IUpdateUser {
    name : string 
    bio : string 
}

export interface ICourse{
    title : string 
    name? : string 
    level? : string 
    description? : string 
    avatar? : string 
    price? : string 
    discount? : string 
    top? : boolean
    teacherId : string 
}

export interface IFile { 
    courseId : string 
    title : string 
    file : string  
    size : number 
}