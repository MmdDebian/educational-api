"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.file_validate = exports.comment_validate = exports.createCourse_vlidate = exports.createUser_validate = exports.login_validate = exports.register_validate = void 0;
const express_validator_1 = require("express-validator");
function register_validate() {
    return [
        (0, express_validator_1.check)('name', 'name is required').not(),
        // check email
        (0, express_validator_1.check)('email', 'email is required').notEmpty(),
        (0, express_validator_1.check)('email', 'email is inValid').isEmail(),
        // chech password 
        (0, express_validator_1.check)('password', 'password is required').notEmpty(),
        (0, express_validator_1.check)('password', 'the password is not scure').isLength({ min: 5 })
    ];
}
exports.register_validate = register_validate;
function login_validate() {
    return [
        // check email
        (0, express_validator_1.check)('email', 'email is required').notEmpty(),
        (0, express_validator_1.check)('email', 'email is inValid').isEmail(),
        // chech password 
        (0, express_validator_1.check)('password', 'password is required').notEmpty(),
    ];
}
exports.login_validate = login_validate;
function createUser_validate() {
    return [
        // check email
        (0, express_validator_1.check)('email', 'email is required').notEmpty(),
        (0, express_validator_1.check)('email', 'email is inValid').isEmail(),
        // chech password 
        (0, express_validator_1.check)('password', 'password is required').notEmpty(),
    ];
}
exports.createUser_validate = createUser_validate;
function createCourse_vlidate() {
    return [
        // check email
        (0, express_validator_1.check)('title', 'title is required').notEmpty(),
    ];
}
exports.createCourse_vlidate = createCourse_vlidate;
function comment_validate() {
    return [
        // check comment
        (0, express_validator_1.check)('content', 'content is required').notEmpty(),
    ];
}
exports.comment_validate = comment_validate;
function file_validate() {
    return [
        // check file
        (0, express_validator_1.check)('file', 'file is required').notEmpty(),
    ];
}
exports.file_validate = file_validate;
