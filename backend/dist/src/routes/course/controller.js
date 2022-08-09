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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileToCourse = exports.addFileToCourse = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getById = exports.getAllCourse = void 0;
const fs_1 = require("fs");
const response_1 = __importDefault(require("../../utils/response"));
const service_1 = __importDefault(require("./service"));
function getAllCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield service_1.default.getAllCourse();
        (0, response_1.default)(res, {
            data: courses,
        });
    });
}
exports.getAllCourse = getAllCourse;
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        let found = yield service_1.default.getCourseById(id);
        if (!found) {
            return (0, response_1.default)(res, {
                message: 'not found',
                status: 404
            });
        }
        (0, response_1.default)(res, {
            data: found
        });
    });
}
exports.getById = getById;
function createCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, description, discount, price, title, avatar, level } = req.body;
        if (req.file) {
            avatar = req.file.path.replace(/\\/g, '/').substring(6);
        }
        let data = {
            name,
            description,
            discount,
            price,
            title,
            avatar,
            level,
            teacherId: req.user.id
        };
        const newCourse = yield service_1.default.createCourse(data);
        (0, response_1.default)(res, {
            message: 'successfully created',
            status: 201,
            data: newCourse
        });
    });
}
exports.createCourse = createCourse;
function updateCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        const found = yield service_1.default.getCourseById(id);
        if (!found) {
            return (0, response_1.default)(res, {
                message: 'course is not found',
                status: 404
            });
        }
        let { name, description, discount, price, title, avatar, level } = req.body;
        let data = {
            name,
            description,
            discount,
            price,
            title,
            level,
            avatar,
            teacherId: req.user.id
        };
        if (req.file) {
            data.avatar = req.file.path.replace(/\\/g, '/').substring(6);
            let previousFilePath = `${process.cwd()}/public/${found.avatar}`;
            (0, fs_1.unlink)(previousFilePath, (err) => {
                console.error(err);
            });
        }
        const result = yield service_1.default.updateCourse(id, data);
        (0, response_1.default)(res, {
            message: 'successFully updated',
            data: result,
        });
    });
}
exports.updateCourse = updateCourse;
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        service_1.default.deleteCourse(id)
            .then(() => {
            (0, response_1.default)(res, {
                message: 'successfully deleted',
            });
        })
            .catch(() => {
            (0, response_1.default)(res, {
                message: "the course is not found"
            });
        });
    });
}
exports.deleteCourse = deleteCourse;
function addFileToCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const course = yield service_1.default.getCourseById(id);
        if (!course) {
            return (0, response_1.default)(res, {
                message: 'course is not found',
                status: 404
            });
        }
        let { title, file } = req.body;
        if (!req.file) {
            return (0, response_1.default)(res, {
                message: 'file is required',
                status: 400
            });
        }
        else {
            file = req.file.path.replace(/\\/g, '/').substring(6);
        }
        const data = {
            title: title,
            file: file,
            courseId: course.id,
            size: req.file.size
        };
        const newFile = yield service_1.default.addFileToCourse(data);
        (0, response_1.default)(res, {
            message: 'successfuly uploaded',
            data: newFile,
        });
    });
}
exports.addFileToCourse = addFileToCourse;
function deleteFileToCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const found = yield service_1.default.getFilesById(id);
        if (!found) {
            return (0, response_1.default)(res, {
                message: 'file is not found',
                status: 400
            });
        }
        const filePath = `${process.cwd()}/public/${found.file}`;
        (0, fs_1.unlink)(filePath, (err) => {
            console.error(err);
        });
        service_1.default.deleteFileToCourse(id)
            .then(() => {
            (0, response_1.default)(res, {
                message: 'successfully deleted',
            });
        });
    });
}
exports.deleteFileToCourse = deleteFileToCourse;
