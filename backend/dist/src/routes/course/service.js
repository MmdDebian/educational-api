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
        this.getAllCourse = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.course.findMany({
                    include: {
                        teacher: {
                            select: {
                                name: true,
                                email: true,
                                avatar: true
                            }
                        },
                        files: true,
                        comments: {
                            include: {
                                user: {
                                    select: {
                                        name: true,
                                        email: true,
                                        avatar: true
                                    }
                                }
                            }
                        }
                    }
                })
                    .then(result => {
                    resolve(result);
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
        this.getCourseById = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.course.findUnique({
                    where: { id: id },
                    include: {
                        files: true,
                        comments: {
                            include: {
                                user: {
                                    select: {
                                        name: true,
                                        email: true,
                                        avatar: true
                                    }
                                }
                            }
                        }
                    }
                })
                    .then((found) => {
                    if (!found)
                        return resolve(null);
                    resolve(found);
                })
                    .catch((err) => {
                    reject(err);
                });
            }));
        });
        this.createCourse = (body) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.course.create({
                    data: body,
                    include: {
                        teacher: {
                            select: {
                                name: true,
                                email: true,
                                avatar: true
                            }
                        }
                    }
                })
                    .then((course) => {
                    resolve(course);
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
        this.updateCourse = (id, data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.course.update({
                    where: { id: id },
                    data: data,
                    include: {
                        files: true,
                        comments: {
                            include: {
                                user: true
                            }
                        }
                    }
                })
                    .then((course) => {
                    resolve(course);
                })
                    .catch((err) => reject(err));
            });
        });
        this.addFileToCourse = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return this.files.create({ data }).then((file) => resolve(file)).catch((err) => reject(err));
            });
        });
        this.getFilesById = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.files.findUnique({ where: { id: id } })
                    .then((file) => {
                    if (!file)
                        return resolve(null);
                    resolve(file);
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
        this.deleteFileToCourse = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                return this.files.delete({ where: { id: id } }).then(() => resolve(true));
            });
        });
        this.deleteCourse = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.course.delete({ where: { id: id } })
                    .then(() => { resolve('deleted course'); })
                    .catch((err) => reject(err));
            });
        });
    }
}
exports.default = new Service;
