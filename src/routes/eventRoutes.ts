import { Router } from 'express';
import { eventController } from '../controllers/eventController';
('../controllers/eventController');

const eventRouter: Router = Router();

//Routes
eventRouter
  .route('/')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

eventRouter
  .route('/:id')
  .get(eventController.getEventsByIdOrWeekday)
  .delete(eventController.deleteEventByIdOrWeekday);

export { eventRouter };
