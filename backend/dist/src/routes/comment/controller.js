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
exports.deleteComment = exports.addComment = void 0;
const lodash_1 = __importDefault(require("lodash"));
const response_1 = __importDefault(require("../../utils/response"));
const service_1 = __importDefault(require("./service"));
function addComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { content } = req.body;
        const course = yield service_1.default.findCourse(id);
        if (!course) {
            return (0, response_1.default)(res, {
                message: "course is not found",
                status: 404
            });
        }
        const data = {
            content: content,
            userId: req.user.id,
            courseId: course.id
        };
        const result = yield service_1.default.addComment(data);
        (0, response_1.default)(res, {
            message: 'successfully added comment',
            data: {
                user: lodash_1.default.pick(req.user, ['name', 'email', 'bio', 'avatar']),
                comment: result.content
            }
        });
    });
}
exports.addComment = addComment;
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        service_1.default.deleteComment(id)
            .then(() => {
            (0, response_1.default)(res, {
                message: 'successfully deleted'
            });
        });
    });
}
exports.deleteComment = deleteComment;
