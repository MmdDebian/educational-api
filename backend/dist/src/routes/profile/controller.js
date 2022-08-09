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
exports.deleteAvatar = exports.addAvatar = exports.updateUser = exports.profile = void 0;
const service_1 = __importDefault(require("./service"));
const response_1 = __importDefault(require("../../utils/response"));
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = require("fs");
const bcrypt_1 = require("../../lib/bcrypt");
function profile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, response_1.default)(res, {
            data: lodash_1.default.pick(req.user, ['name', 'email', 'avatar', 'bio', 'isAdmin'])
        });
    });
}
exports.profile = profile;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { name, bio, password } = req.body;
        if (password) {
            password = yield (0, bcrypt_1.hashPassword)(password);
        }
        else {
            password = req.user.password;
        }
        let data = {
            name,
            bio,
            password
        };
        const result = yield service_1.default.updateUser(req.user, data);
        (0, response_1.default)(res, {
            message: 'successfully updated',
            status: 200,
            data: lodash_1.default.pick(result, ['name', 'bio', 'avatar'])
        });
    });
}
exports.updateUser = updateUser;
function addAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = `${process.cwd()}/public/${req.user.avatar}`;
        (0, fs_1.unlink)(filePath, (err) => {
            console.error('can not delete file');
        });
        let { avatar } = req.body;
        if (!req.file) {
            return avatar = null;
        }
        else {
            console.log(req.file);
            avatar = req.file.path.replace(/\\/g, '/').substring(6);
        }
        const result = yield service_1.default.addAvatar(req.user, avatar);
        (0, response_1.default)(res, {
            message: 'success update avatar',
            data: lodash_1.default.pick(result, ['name', 'bio', 'avatar']),
        });
    });
}
exports.addAvatar = addAvatar;
function deleteAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const filePath = `${process.cwd()}/public/${req.user.avatar}`;
        (0, fs_1.unlink)(filePath, (err) => {
            console.error('can not delete file');
        });
        service_1.default.deleteAvatar(req.user)
            .then(() => {
            (0, response_1.default)(res, {
                message: 'successfully deleted avatar',
            });
        });
    });
}
exports.deleteAvatar = deleteAvatar;
