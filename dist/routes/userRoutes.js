"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authController_1 = require("../controllers/authController");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
//Routes
userRouter.route('/signUp').post((0, catchAsync_1.default)(userController_1.userController.signUp));
userRouter.route('/signIn').post(userController_1.userController.signIn);
userRouter.use(authController_1.authcontroller.protect);
userRouter.route('/logout').get(userController_1.userController.logout);
userRouter
    .route('/')
    .patch((0, catchAsync_1.default)(userController_1.userController.updateMe))
    .delete((0, catchAsync_1.default)(userController_1.userController.deleteMe));
