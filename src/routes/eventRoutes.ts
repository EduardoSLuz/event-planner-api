import { Router } from 'express';
import { eventController } from '../controllers/eventController';
import { authcontroller } from '../controllers/authController';
import catchAsync from '../utils/catchAsync';

const eventRouter: Router = Router();

eventRouter.use(authcontroller.protect);

//Routes
eventRouter
  .route('/')
  .get(authcontroller.protect, eventController.getEvents)
  .post(catchAsync(eventController.createEvent))
  .delete(catchAsync(eventController.deleteEventByWeekDay));

eventRouter
  .route('/:id')
  .get(catchAsync(eventController.getEvent))
  .delete(catchAsync(eventController.deleteEventById));

export { eventRouter };
