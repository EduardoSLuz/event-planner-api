import { Router } from 'express';
import { eventController } from '../controllers/eventController';
import { authcontroller } from '../controllers/authController';
import catchAsync from '../utils/catchAsync';

const eventRouter: Router = Router();

//Routes
eventRouter
  .route('/')
  .get(authcontroller.protect, catchAsync(eventController.getAllEvents))
  .post(catchAsync(eventController.createEvent));

eventRouter
  .route('/:id')
  .get(eventController.getEventsByIdOrWeekday)
  .delete(eventController.deleteEventByIdOrWeekday);

export { eventRouter };
