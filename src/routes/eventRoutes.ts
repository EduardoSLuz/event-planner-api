import { Router } from 'express';
import { eventController } from '../controllers/eventController';
import { authcontroller } from '../controllers/authController';
import catchAsync from '../utils/catchAsync';

const eventRouter: Router = Router();

eventRouter.use(authcontroller.protect);

//Routes
eventRouter
  .route('/')
  .get(eventController.getEvents)
  .post(catchAsync(eventController.createEvent));

eventRouter
  .route('/:id')
  .get(eventController.getEvent)
  .delete(eventController.deleteEventByIdOrWeekDay);

export { eventRouter };
