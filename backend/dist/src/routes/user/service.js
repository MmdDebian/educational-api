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
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.user.findMany({}).then(users => resolve(users));
            });
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.user.findUnique({ where: { id: id } })
                    .then((user) => {
                    if (!user)
                        return resolve(null);
                    resolve(user);
                })
                    .catch((err) => reject(err));
            });
        });
        this.getByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.user.findUnique({ where: { email: email } })
                    .then((user) => {
                    if (!user)
                        return resolve(null);
                    resolve(user);
                })
                    .catch((err) => reject(err));
            });
        });
        this.create = (body) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.user.create({ data: body }).then(user => resolve(user));
            });
        });
        this.update = (id, body) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.user.update({ where: { id: id }, data: body }).then(user => resolve(user));
            });
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.user.delete({ where: { id: id } }).then(() => resolve('deleted user'))
                    .catch((err) => reject(err));
            });
        });
    }
}
exports.default = new Service;
