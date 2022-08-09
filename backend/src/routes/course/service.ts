import { Course, Files, PrismaClient } from "@prisma/client";
import { ICourse, IFile } from "../../lib/interfaces";


class Service extends PrismaClient{
    
    getAllCourse = async ():Promise<Course[]>=>{
        return new Promise((resolve , reject)=>{
            this.course.findMany({
                include : {
                    teacher : {
                        select : {
                            name : true , 
                            email : true ,
                            avatar : true
                        }
                    },
                    files : true , 
                    comments : {
                        include : {
                            user : {
                                select : {
                                    name : true , 
                                    email : true , 
                                    avatar : true
                                }
                            } 
                        }
                    }
                }
            })
            .then(result=>{
                resolve(result);
            })
            .catch((err)=>{
                reject(err)
            })
        })  
    }

    getCourseById = async (id:string):Promise<Course | null>=>{
        return new Promise(async(resolve, reject) => {
            this.course.findUnique({
                where : {id : id} , 
                include : {
                    files : true , 
                    comments : {
                        include : {
                            user : {
                                select : {
                                    name : true ,
                                    email : true ,
                                    avatar : true
                                }
                            }
                        }
                    }
                }
            })
            .then((found)=>{
                if(!found) return resolve(null)
                resolve(found)
            })
            .catch((err)=>{
                reject(err)
            })
        });
    }

    createCourse = async (body:ICourse)=>{
        return new Promise<Course>((resolve, reject) => {
            this.course.create({
                data : body ,
                include : {
                    teacher : {
                        select : {
                            name : true ,
                            email : true ,
                            avatar : true
                        }
                    }
                }
            })
            .then((course)=>{
                resolve(course);
            })
            .catch((err)=>{
                reject(err);
            })
        })
    }

    updateCourse = async (id:string , data:ICourse)=>{
        return new Promise<Course>((resolve, reject) => {
            this.course.update({
                where : {id : id} , 
                data:data , 
                include : {
                    files : true ,
                    comments : {
                        include : {
                            user : true
                        }
                    }
                }
            })
            .then((course)=>{
                resolve(course)
            })
            .catch((err)=>reject(err))
        })
    }

    addFileToCourse = async (data:IFile)=>{
        return new Promise<Files>((resolve, reject) => {
            return this.files.create({data}).then((file)=>resolve(file)).catch((err)=>reject(err))
        })
    }

    getFilesById = async (id:string)=>{
        return new Promise<Files | null>((resolve, reject) => {
            this.files.findUnique({where : {id : id}})
            .then((file)=>{
                if(!file) return resolve(null)
                resolve(file)
            })
            .catch((err)=>{
                reject(err)
            })
        })
    }

    deleteFileToCourse = async (id:string)=>{
        return new Promise<string | boolean>((resolve, reject) => {
            return this.files.delete({where : {id : id}}).then(()=>resolve(true))
        })
    }

    deleteCourse = async (id:string)=>{
        return new Promise<string | null>((resolve, reject) => {
            this.course.delete({where :{id:id}})
            .then(()=>{resolve('deleted course')})
            .catch((err)=>reject(err));
        })
    }
}

export default new Service ;