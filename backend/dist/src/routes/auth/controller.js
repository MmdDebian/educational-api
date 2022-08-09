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
exports.login = exports.register = void 0;
const response_1 = __importDefault(require("../../utils/response"));
const service_1 = __importDefault(require("./service"));
const bcrypt_1 = require("../../lib/bcrypt");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, email, password } = req.body;
        const user = yield service_1.default.getUserFromEmail(email);
        if (user) {
            return (0, response_1.default)(res, {
                message: 'email or password is not valid',
                status: 409
            });
        }
        // hash password
        password = yield (0, bcrypt_1.hashPassword)(password);
        let data = {
            name,
            email,
            password,
        };
        const newUser = yield service_1.default.createUser(data);
        const token = yield service_1.default.createToken(newUser);
        (0, response_1.default)(res, {
            message: 'successfuly registerd',
            data: token
        });
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield service_1.default.getUserFromEmail(email);
        if (!user) {
            return (0, response_1.default)(res, {
                message: 'email or password is not valid',
                status: 400
            });
        }
        const isValid = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isValid) {
            return (0, response_1.default)(res, {
                message: 'email or password is not valid',
                status: 400
            });
        }
        const token = yield service_1.default.createToken(user);
        (0, response_1.default)(res, {
            message: 'successfully logged ',
            data: token,
        });
    });
}
exports.login = login;
