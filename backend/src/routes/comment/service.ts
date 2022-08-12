import { Comment, Course, PrismaClient } from "@prisma/client";
import { IComment } from "../../lib/interfaces";


class Service extends PrismaClient {

    findCourse = async (id:number):Promise<Course | null>=>{
        return await this.course.findUnique({where:{id}});
    }

    addComment = async (data:IComment):Promise<Comment>=>{
        return await this.comment.create({data});
    }

    deleteComment = async (id:number)=>{
        return await this.comment.delete({where : {id}});
    }
}

export default new Service ;