/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import Controller from './controller';
import { autobind } from '../utils/util';
import eventModel from '../models/Events';

class EventController extends Controller {
  // Get all events or events of the day of week passed by query (if the user insert a day of the week in the query)
  @autobind
  public async getEvents(req: Request, res: Response) {
    let results;
    if (Object.keys(req.query).length !== 0) {
      results = await eventModel.find(
        { dayOfWeek: req.query.dayOfWeek },
        'description dayOfWeek dateTime'
      );
    } else {
      results = await eventModel.find({}, 'description dayOfWeek dateTime');
      /* console.log(results); */
      if (!results) {
        return this.sendError(res, 'No event found!');
      }
    }
    return res.status(200).json({
      events: results,
      /* token: req.headers.cookie, */
    });
  }

  // Get event by id
  @autobind
  public async getEvent(req: Request, res: Response) {
    let result;
    if (req.params.id) {
      const { id } = req.params;
      result = await eventModel.find({ _id: id });
      /* console.log(results); */
    } else {
      return this.sendError(res, 'No event found!');
    }
    return res.status(200).json({
      event: result,
    });
  }

  // POST CREATE EVENT
  @autobind
  public async createEvent(req: Request, res: Response, next: NextFunction) {
    const event = await eventModel.create({
      description: req.body.description,
      dayOfWeek: req.body.dayOfWeek,
      dateTime: req.body.dateTime,
    });

    return res.status(201).json({
      status: 'OK',
      message: 'The event has been successfully registered!',
      data: {
        event,
      },
    });
  }

  // DELETE EVENT BY ID OR DAYWEEK
  @autobind
  async deleteEventByIdOrWeekDay(req: Request, res: Response) {
    let result;
    if (req.params.id) {
      const { id } = req.params;
      //console.log(req.params);
      result = await eventModel.findByIdAndRemove(id);
      if (result == null) {
        return this.sendError(res, 'No event with ID informed!');
      }
      /* console.log(result); */
    } else {
      return this.sendError(res, 'No ID informed!');
    }
    return res.status(200).json({ message: 'Event deleted', result });
  }
}

export const eventController = new EventController();
