"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../utils/response"));
function isAdmin(req, res, next) {
    if (!req.user.isAdmin) {
        return (0, response_1.default)(res, {
            message: 'access denied',
            status: 401
        });
    }
    next();
}
exports.default = isAdmin;
