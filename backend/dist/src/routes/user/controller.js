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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const service_1 = __importDefault(require("./service"));
const response_1 = __importDefault(require("../../utils/response"));
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = require("fs");
const bcrypt_1 = require("../../lib/bcrypt");
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield service_1.default.getAll();
        const result = users.map(user => {
            return lodash_1.default.pick(user, ['name', 'email', 'avatar', 'bio', 'isAdmin']);
        });
        (0, response_1.default)(res, {
            data: result
        });
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const user = yield service_1.default.getById(id);
        if (!user) {
            return (0, response_1.default)(res, {
                message: 'user is not Found',
                status: 404
            });
        }
        (0, response_1.default)(res, {
            data: lodash_1.default.pick(user, ['id', 'email', 'bio', 'avatar', 'isAdmin'])
        });
    });
}
exports.getUserById = getUserById;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, email, password } = req.body;
        const user = yield service_1.default.getByEmail(email);
        if (user) {
            return (0, response_1.default)(res, {
                message: 'user is registerd',
                status: 409
            });
        }
        password = yield (0, bcrypt_1.hashPassword)(password);
        const data = {
            name,
            email,
            password,
        };
        const newUser = yield service_1.default.create(data);
        (0, response_1.default)(res, {
            message: 'success created user',
            data: lodash_1.default.pick(newUser, ['name', 'email', 'avatar', 'bio'])
        });
    });
}
exports.createUser = createUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const user = yield service_1.default.getById(id);
        if (!user) {
            return (0, response_1.default)(res, {
                message: 'user is not found',
                status: 404
            });
        }
        let { name, email, password, isAdmin } = req.body;
        if (password) {
            password = yield (0, bcrypt_1.hashPassword)(password);
        }
        else {
            password = user.password;
        }
        let data = {
            name,
            email,
            password,
            isAdmin,
        };
        const result = yield service_1.default.update(id, data);
        (0, response_1.default)(res, {
            message: 'success updated',
            data: lodash_1.default.pick(result, ['name', 'email', 'bio', 'avatar', 'isAdmin'])
        });
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const user = yield service_1.default.getById(id);
        if (!user) {
            return (0, response_1.default)(res, {
                message: 'user is not found',
                status: 404
            });
        }
        let filePath = `${process.cwd()}/public/${user.avatar}`;
        (0, fs_1.unlink)(filePath, (err) => {
            console.error('no such file in path');
        });
        service_1.default.deleteUser(id).then(() => (0, response_1.default)(res, { message: 'success deleted' }));
    });
}
exports.deleteUser = deleteUser;
