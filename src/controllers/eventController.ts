import { Request, Response } from 'express';
import Controller from './controller';
import { autobind } from './../utils/util';
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
  // GET ALL EVENTS
  @autobind
  public getAllEvents(req: Request, res: Response) {
    if (events.length == 0) {
      return this.sendError(res, 'No event found!');
    }

    return res.status(200).json(events);
  }

  // GET EVENTS BY WEEKDAY OR ID
  @autobind
  public getEventsByIdOrWeekday(req: Request, res: Response) {
    const { id } = req.params;
    const day = weekDays.find((el) => el.name === id);
    const validation = !+id && day?.val;

    const fEvents = events.filter((el: Event) =>
      validation ? new Date(el.dateTime).getDay() === +day.val : el._id === id
    );

    if (fEvents.length === 0) {
      return this.sendError(res, 'No event found!');
    }

    return res.status(200).json(validation ? fEvents : fEvents[0]);
  }

  // POST CREATE EVENT
  @autobind
  public createEvent(req: Request, res: Response) {
    const data = this.validBody(req) ? Object.assign(req.body) : {};

    if (!data.description || !data.dateTime || !data.createdAt) {
      return this.sendError(res, 'Invalid Resquest!');
    }

    const newId =
      events.length > 0 && events[events.length - 1]._id
        ? `${+events[events.length - 1]._id + 1}`
        : '1';

    const newEvent = {
      _id: newId,
      description: data.description,
      dateTime: data.dateTime,
      createdAt: data.createdAt,
    };

    events.push(newEvent);
    fs.writeFileSync(urlEvents, JSON.stringify(events));

    return res.status(201).json({
      status: 'OK',
      message: 'The event has been successfully registered!',
      data: {
        event: [newEvent],
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
