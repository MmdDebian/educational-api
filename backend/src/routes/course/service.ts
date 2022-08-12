import { Course, File, PrismaClient } from "@prisma/client";
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

    getCourseById = async (id:number):Promise<Course | null>=>{
        return await this.course.findUnique({
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
    }

    createCourse = async (body:ICourse):Promise<Course>=>{
        return await this.course.create({
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
    }

    updateCourse = async (id:number , data:ICourse):Promise<Course>=>{
        return await this.course.update({
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
    }

    addFileToCourse = async (data:IFile):Promise<File>=>{
        return this.file.create({data})
    }

    getFilesById = async (id:number):Promise<File | null>=>{
        return await this.file.findUnique({where : {id : id}})
    }

    deleteFileToCourse = async (id:number):Promise<any>=>{
        return await this.file.delete({where : {id : id}});
    }

    deleteCourse = async (id:number):Promise<any>=>{
        return await this.course.delete({where :{id:id}});
    }
}

export default new Service ;