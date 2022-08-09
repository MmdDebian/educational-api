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
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
exports.default = new class service extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        // generate token 
        this.createToken = (user) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((success, error) => __awaiter(this, void 0, void 0, function* () {
                const token = yield jsonwebtoken_1.default.sign({ userId: user.id }, config_1.default.get('jwt_key'), { expiresIn: '2d' });
                return success(token);
            }));
        });
        // create user servise
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((success, error) => {
                this.user.create({ data: user })
                    .then((data) => {
                    return success(data);
                });
            });
        });
        // get user by email service 
        this.getUserFromEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((found, not_found) => {
                this.user.findUnique({ where: { email: email } })
                    .then((user) => {
                    if (user == null)
                        return found(null);
                    return found(user);
                })
                    .catch((err) => {
                    not_found(true);
                });
            });
        });
    }
};
