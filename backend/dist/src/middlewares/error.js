"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const response_1 = __importDefault(require("../utils/response"));
function errors(err, req, res, next) {
    logger_1.default.error(err);
    (0, response_1.default)(res, {
        message: 'internet server error',
        status: 500
    });
}
exports.default = errors;
