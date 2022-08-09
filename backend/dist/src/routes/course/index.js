"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAdmin_1 = __importDefault(require("../../middlewares/isAdmin"));
const isAuth_1 = __importDefault(require("../../middlewares/isAuth"));
const config_1 = __importDefault(require("../../uploads/config"));
const validate_1 = __importDefault(require("../../validators/validate"));
const validation_body_1 = require("../../validators/validation_body");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.get('/', controller_1.getAllCourse);
router.get('/:id', controller_1.getById);
router.post('/', isAuth_1.default, isAdmin_1.default, (0, validation_body_1.createCourse_vlidate)(), validate_1.default, config_1.default.single('avatar'), controller_1.createCourse);
router.put('/:id', isAuth_1.default, isAdmin_1.default, config_1.default.single('avatar'), controller_1.updateCourse);
router.delete('/:id', isAuth_1.default, isAdmin_1.default, controller_1.deleteCourse);
// course id for add new file 
router.post('/:id/file/', isAuth_1.default, isAdmin_1.default, config_1.default.single('file'), controller_1.addFileToCourse);
// course file id 
router.delete('/file/:id', isAuth_1.default, isAdmin_1.default, controller_1.deleteFileToCourse);
exports.default = router;
