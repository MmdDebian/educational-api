export interface IUser {
    name : string | null
    email : string 
    password : string 
}

export interface IUpdateUser {
    name? : string 
    bio? : string 
    email? : string
    password? : string 
    isAdmin? : boolean
    avatar? : string, 
    filePath? : string 
}

export interface ICourse{
    title : string 
    name? : string 
    level? : string 
    description? : string 
    avatar? : string 
    filePath? : string
    price? : string 
    discount? : string 
    teacherId : string 
}

export interface IFile { 
    courseId : number 
    title : string 
    filePath : string
    file : string  
    size : number 
}

export interface IComment {
    content : string 
    courseId : number ,
    userId : string 
}