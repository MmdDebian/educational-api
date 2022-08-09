"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const response_1 = __importDefault(require("../utils/response"));
function checkFile(req, res, next) {
    if (!req.file) {
        return next();
    }
    let fileTypes = ['.png', '.jpeg', '.jpg'];
    if (!fileTypes.includes(path_1.default.extname(req.file.filename))) {
        let filePath = `${process.cwd()}/${req.file.path}`;
        (0, fs_1.unlink)(filePath, (err) => {
            console.error('can not file');
        });
        (0, response_1.default)(res, {
            message: 'the file is inavild',
            status: 400
        });
    }
    next();
}
exports.default = checkFile;
