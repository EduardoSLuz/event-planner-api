"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const authController_1 = require("../controllers/authController");
// Instance of Router, express
const eventRouter = (0, express_1.Router)();
exports.eventRouter = eventRouter;
// Istance of router protected by middleware of JWT
eventRouter.use(authController_1.authcontroller.protect);
//Routes
eventRouter
    .route('/')
    .get(eventController_1.eventController.getEvents)
    .delete((0, catchAsync_1.default)(eventController_1.eventController.deleteEventByWeekDay))
    .post((0, catchAsync_1.default)(eventController_1.eventController.createEvent));
eventRouter
    .route('/:id')
    .get((0, catchAsync_1.default)(eventController_1.eventController.getEvent))
    .delete((0, catchAsync_1.default)(eventController_1.eventController.deleteEventById));
