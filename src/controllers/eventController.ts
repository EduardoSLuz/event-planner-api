/* eslint-disable no-console */
import AppError from '../utils/appError';
import eventModel from '../models/Events';
import { Request, Response, NextFunction } from 'express';
import { autobind } from '../utils/util';

class EventController {
  // Get all events or events of the day of week passed by query (if the user insert a day of the week in the query)
  @autobind
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

  // Get the event by id
  @autobind
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

  // Create a event with the request body
  @autobind
  public async createEvent(req: Request, res: Response) {
    const event = await eventModel.create({
      description: req.body.description,
      dayOfWeek: req.body.dayOfWeek,
      dateTime: req.body.dateTime,
      user: res.locals.user.id,
    });

    return res.status(201).json({
      status: 'OK',
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

  // Delet a event with the ID in the param, if the event with the ID exists
  @autobind
  async deleteEventByIdOrWeekDay(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let result;
    if (req.params.id) {
      const { id } = req.params;
      //console.log(req.params);

      result = await eventModel.findByIdAndRemove(id);
      if (result == null) {
        return next(new AppError('No event with id informed!', 404));
      }
      /* console.log(result); */
    } else {
      return next(new AppError('No id informed!', 400));
    }
    return res.status(200).json({ message: 'Event deleted', result });
  }
}

export const eventController = new EventController();
