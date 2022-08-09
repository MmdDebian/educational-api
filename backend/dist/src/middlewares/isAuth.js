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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const client_1 = require("@prisma/client");
const response_1 = __importDefault(require("../utils/response"));
const User = new client_1.PrismaClient().user;
function isAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers['x-auth-token'];
        if (!token) {
            return (0, response_1.default)(res, {
                message: 'access denied',
                status: 401
            });
        }
        try {
            const decode = yield jsonwebtoken_1.default.verify(token, config_1.default.get('jwt_key'));
            const user = yield User.findUnique({ where: { id: decode.userId } });
            console.log(user);
            if (!user) {
                throw new Error('access denied');
            }
            req.user = user;
            next();
        }
        catch (err) {
            return (0, response_1.default)(res, {
                message: 'access denied',
                status: 401
            });
        }
    });
}
exports.default = isAuth;
