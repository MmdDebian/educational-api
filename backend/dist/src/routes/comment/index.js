"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../../middlewares/isAuth"));
const validate_1 = __importDefault(require("../../validators/validate"));
const validation_body_1 = require("../../validators/validation_body");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.use(isAuth_1.default);
router.post('/:id', (0, validation_body_1.comment_validate)(), validate_1.default, controller_1.addComment);
router.delete('/:id', controller_1.deleteComment);
exports.default = router;
