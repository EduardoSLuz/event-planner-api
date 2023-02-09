import { Request, Response } from 'express';
import fs from 'fs';

const urlEvents = `${__dirname}/../../dev-data/events.json`;
let events = JSON.parse(fs.readFileSync(urlEvents, 'utf8'));

const weekDays = [
  { name: 'sunday', val: '0' },
  { name: 'monday', val: '1' },
  { name: 'tuesday', val: '2' },
  { name: 'wednesday', val: '3' },
  { name: 'thursday', val: '4' },
  { name: 'friday', val: '5' },
  { name: 'saturday', val: '6' },
];

class EventController {
  // GET ALL EVENTS
  public getAllEvents(req: Request, res: Response) {
    return res.status(200).json(events);
  }

  // GET EVENTS BY WEEKDAY OR ID
  public getEventsByWeekId(req: Request, res: Response) {
    const { id } = req.params;

    if (!+id) {
      const day = weekDays.filter((el) => el.name === id)[0];

      const wEvents = events.filter(
        (el: any) => new Date(el.dateTime).getDay() === +day.val
      );

      if (wEvents.length > 0) return res.status(200).json(wEvents);
    } else {
      const event = events.find((el: any) => el._id === id);
      if (event) return res.status(200).json(event);
    }

    return res.status(404).json({
      status: 'Fail',
      message: 'No events found!',
    });
  }

  // POST CREATE EVENT
  public createEvent(req: Request, res: Response) {
    const data = Object.assign(req.body);

    if (!data.description || !data.dateTime || !data.createdAt)
      return res.status(404).json({
        status: 'Fail',
        message: 'Invalid Resquest!',
      });

    const newId =
      events.length > 0 && events[events.length - 1]._id
        ? `${events[events.length - 1]._id * 1 + 1}`
        : '1';
    const newEvent = { _id: newId, ...data };

    events.push(newEvent);

    fs.writeFile(urlEvents, JSON.stringify(events), () => {
      return res.status(201).json({
        status: 'OK',
        message: 'The event has been successfully registered!',
        data: {
          event: newEvent,
        },
      });
    });
  }

  // DELETE EVENT BY ID
  public deleteEventById(req: Request, res: Response) {
    const { id } = req.params;
    const delEvent = events.find((el: any) => el._id === id);
    const newEvents = events.filter((el: any) => el._id !== id);

    if (!delEvent)
      return res.status(404).json({
        status: 'Fail',
        message: 'No events found!',
      });

    fs.writeFile(urlEvents, JSON.stringify(newEvents), () => {
      events = [...newEvents];
      return res.status(200).json({
        status: 'OK',
        message: 'The event has been successfully deleted!',
        data: {
          event: delEvent,
        },
      });
    });
  }

  // DELETE EVENTS BY WEEKDAY
  public deleteEventsByDayWeek(req: Request, res: Response) {
    const { id } = req.params;
    const day = weekDays.filter((el) => el.name === id)[0];

    const delEvents = events.filter(
      (el: any) => new Date(el.dateTime).getDay() === +day.val
    );
    const newEvents = events.filter(
      (el: any) => new Date(el.dateTime).getDay() !== +day.val
    );

    if (delEvents.length === 0)
      return res.status(404).json({
        status: 'Fail',
        message: 'No events found!',
      });

    fs.writeFile(urlEvents, JSON.stringify(newEvents), () => {
      events = [...newEvents];
      return res.status(200).json({
        status: 'OK',
        message: 'The events has been successfully deleted!',
        data: {
          events: delEvents,
        },
      });
    });
  }
}

// export const checkID: RequestHandler = (req, res, next, val) => {
//   console.log(`Event id is: ${val}`);

//   next();
// };

export const eventController = new EventController();
