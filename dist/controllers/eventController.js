"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventController = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const Events_1 = __importDefault(require("../models/Events"));
class EventController {
    // Get all events or events of the day of week passed by query (if the user insert a day of the week in the query)
    async getEvents(req, res, next) {
        const opts = Object.keys(req.query).length !== 0
            ? { dayOfWeek: req.query.dayOfWeek }
            : {};
        const results = await Events_1.default.find({
            ...opts,
            user: res.locals.user.id,
        });
        if (!results || results.length == 0) {
            return next(new appError_1.default('No event found!', 404));
        }
        return res.status(200).json({
            events: results,
        });
    }
    // Get event by id
    async getEvent(req, res, next) {
        const { id } = req.params;
        const result = await Events_1.default.find({ _id: id, user: res.locals.user.id });
        if (!result || result.length == 0) {
            return next(new appError_1.default('No event found!', 404));
        }
        return res.status(200).json({
            event: result,
        });
    }
    // POST CREATE EVENT
    async createEvent(req, res, next) {
        const event = await Events_1.default.create({
            description: req.body.description,
            dayOfWeek: req.body.dayOfWeek.toLowerCase(),
            dateTime: req.body.dateTime,
            user: res.locals.user.id,
        });
        return res.status(201).json({
            status: 'success',
            message: 'The event has been successfully registered!',
            data: {
                event: {
                    description: event.description,
                    dayOfWeek: event.dayOfWeek,
                    dateTime: event.dateTime,
                    createdAt: event.createdAt,
                    _id: event.id,
                },
            },
        });
    }
    // DELETE EVENT BY ID
    async deleteEventById(req, res, next) {
        const { id } = req.params;
        const event = await Events_1.default.findOneAndRemove({
            _id: id,
            user: res.locals.user.id,
        });
        if (!event) {
            return next(new appError_1.default('No event with ID informed!', 404));
        }
        return res
            .status(200)
            .json({ status: 'success', message: 'Event deleted!', event });
    }
    // DELETE EVENT BY WEEKDAY
    async deleteEventByWeekDay(req, res, next) {
        const events = await Events_1.default.deleteMany({
            dayOfWeek: req.query.dayOfWeek,
            user: res.locals.user.id,
        });
        if (events.deletedCount === 0) {
            return next(new appError_1.default('No event with dayOfWeek informed!', 404));
        }
        return res.status(200).json({
            status: 'success',
            message: 'Events deleted!',
            eventsDeleted: events.deletedCount,
        });
    }
}
exports.eventController = new EventController();
