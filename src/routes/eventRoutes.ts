import { Router } from 'express';
import { eventController } from '../controllers/eventController';
import { authcontroller } from '../controllers/authController';
import catchAsync from '../utils/catchAsync';

const eventRouter: Router = Router();

//Routes
eventRouter
  .route('/')
  .get(authcontroller.protect, eventController.getEvents)
  .post(catchAsync(eventController.createEvent));

eventRouter
  .route('/:id')
  .get(authcontroller.protect, eventController.getEvent)
  .delete(authcontroller.protect, eventController.deleteEventByIdOrWeekDay);

export { eventRouter };
