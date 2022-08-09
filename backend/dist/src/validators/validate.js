"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const response_1 = __importDefault(require("../utils/response"));
function validationBody(req, res) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, response_1.default)(res, {
            message: 'validation error',
            status: 400,
            data: errors.array().map(err => err.msg),
        });
        return false;
    }
    return true;
}
function validate(req, res, next) {
    if (!validationBody(req, res)) {
        return;
    }
    next();
}
exports.default = validate;
