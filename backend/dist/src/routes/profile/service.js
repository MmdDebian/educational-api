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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class Service extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.updateUser = (user, body) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((success, error) => {
                this.user.update({ where: { id: user.id }, data: body })
                    .then(result => {
                    success(result);
                })
                    .catch((err) => {
                    error(err);
                });
            });
        });
        this.addAvatar = (user, filePath) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((success, error) => {
                this.user.update({ where: { id: user.id }, data: { avatar: filePath } })
                    .then(result => {
                    success(result);
                })
                    .catch(err => {
                    error(err);
                });
            });
        });
        this.deleteAvatar = (user) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.user.update({ where: { id: user.id }, data: { avatar: 'https://api.realworld.io/images/smiley-cyrus.jpeg' } })
                    .then((result) => {
                    resolve(result);
                })
                    .catch((err) => {
                    reject(err);
                });
            });
        });
    }
}
exports.default = new Service;
