import { Comment, Course, PrismaClient } from "@prisma/client";
import { IComment } from "../../lib/interfaces";


class Service extends PrismaClient {

    findCourse = async (id:string)=>{
        return new Promise<Course | null>((resolve, reject) => {
            this.course.findUnique({where : {id}})
            .then((course)=>{
                if(!course)return resolve(null);
                resolve(course);
            })
        })
    }

    addComment = async (data:IComment)=>{
        return new Promise<Comment>((resolve, reject) => {
            this.comment.create({data : data}).then(comment=>resolve(comment))
        })
    }

    deleteComment = async (id:string)=>{
        return new Promise<string | any>((resolve, reject) => {
            this.comment.delete({where : {id:id}})
            .then(()=>resolve('deleted comment'))
            .catch((err)=>reject(err))
        })
    }
}

export default new Service ;