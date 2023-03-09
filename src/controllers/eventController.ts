/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import Controller from './controller';
import { autobind } from '../utils/util';
import eventModel from '../models/Events';
import fs from 'fs';

type Event = {
  _id: string;
  description: string;
  dateTime: string;
  createdAt: string;
};

const urlEvents = `${__dirname}/../../dev-data/events.json`;
let events: Event[] = JSON.parse(fs.readFileSync(urlEvents, 'utf8'));

const weekDays = [
  { name: 'sunday', val: '0' },
  { name: 'monday', val: '1' },
  { name: 'tuesday', val: '2' },
  { name: 'wednesday', val: '3' },
  { name: 'thursday', val: '4' },
  { name: 'friday', val: '5' },
  { name: 'saturday', val: '6' },
];

class EventController extends Controller {
  // Get all events or events of the day of week passed by query (if the user insert a day of the week in the query)
  @autobind
  public async getEvents(req: Request, res: Response) {
    let results;
    if (Object.keys(req.query).length !== 0) {
      results = eventModel.find({ dayOfWeek: req.query.dayOfWeek });
    } else {
      results = await eventModel.find({});
      console.log(results);

      if (!results) {
        return this.sendError(res, 'No event found!');
      }
    }
    return res.status(200).json({
      events: results,
      token: req.headers.cookie,
    });
  }

  // Get event by id
  @autobind
  public getEvent(req: Request, res: Response) {
    let results;
    if (Number.isNaN(req.params.id)) {
      const { id } = req.params;
      results = eventModel.find({ _id: id });
      console.log(results);
    } else {
      return this.sendError(res, 'No event found!');
    }
    return res.status(200).json({
      event: 'OK',
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
  public deleteEventByIdOrWeekday(req: Request, res: Response) {
    const { id } = req.params;
    const day = weekDays.find((el) => el.name === id);
    const validation = !+id && day?.val;

    const delEvents = events.filter((el: Event) =>
      validation ? new Date(el.dateTime).getDay() === +day.val : el._id === id
    );
    const newEvents = events.filter((el: Event) =>
      validation ? new Date(el.dateTime).getDay() !== +day.val : el._id !== id
    );

    if (delEvents.length === 0) {
      return this.sendError(res, 'No event found!');
    }

    events = [...newEvents];
    fs.writeFileSync(urlEvents, JSON.stringify(newEvents));

    return res.status(200).json({
      status: 'OK',
      message: 'The event(s) has been successfully deleted!',
      data: {
        event: delEvents,
      },
    });
  }
}

export const eventController = new EventController();
