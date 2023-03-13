/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import eventModel from '../models/Events';

class EventController {
  // Get all events or events of the day of week passed by query (if the user insert a day of the week in the query)
  public async getEvents(req: Request, res: Response, next: NextFunction) {
    const opts =
      Object.keys(req.query).length !== 0
        ? { dayOfWeek: req.query.dayOfWeek }
        : {};

    const results = await eventModel.find({
      ...opts,
      user: res.locals.user.id,
    });

    if (!results || results.length == 0) {
      return next(new AppError('No event found!', 404));
    }

    return res.status(200).json({
      events: results,
    });
  }

  // Get event by id
  public async getEvent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const result = await eventModel.find({ _id: id, user: res.locals.user.id });

    if (!result || result.length == 0) {
      return next(new AppError('No event found!', 404));
    }

    return res.status(200).json({
      event: result,
    });
  }

  // POST CREATE EVENT
  public async createEvent(req: Request, res: Response, next: NextFunction) {
    const event = await eventModel.create({
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
          id: event.id,
        },
      },
    });
  }

  // DELETE EVENT BY ID
  public async deleteEventById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const event = await eventModel.findOneAndRemove({
      _id: id,
      user: res.locals.user.id,
    });

    if (!event) {
      return next(new AppError('No event with ID informed!', 404));
    }

    return res
      .status(200)
      .json({ status: 'success', message: 'Event deleted!', event });
  }

  // DELETE EVENT BY WEEKDAY
  public async deleteEventByWeekDay(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const events = await eventModel.deleteMany({
      dayOfWeek: req.query.dayOfWeek,
      user: res.locals.user.id,
    });

    if (events.deletedCount === 0) {
      return next(new AppError('No event with dayOfWeek informed!', 404));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Events deleted!',
      eventsDeleted: events.deletedCount,
    });
  }
}

export const eventController = new EventController();
