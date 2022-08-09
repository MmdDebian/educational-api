"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class Service extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.findCourse = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.course.findUnique({ where: { id } })
                    .then((course) => {
                    if (!course)
                        return resolve(null);
                    resolve(course);
                });
            });
        });
        this.addComment = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.comment.create({ data: data }).then(comment => resolve(comment));
            });
        });
        this.deleteComment = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.comment.delete({ where: { id: id } })
                    .then(() => resolve('deleted comment'))
                    .catch((err) => reject(err));
            });
        });
    }
}
exports.default = new Service;
