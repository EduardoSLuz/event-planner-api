import { Router } from 'express';
import { eventController } from '../controllers/eventController';
import { authcontroller } from '../controllers/authController';
import catchAsync from '../utils/catchAsync';

const eventRouter: Router = Router();

//Routes
eventRouter
  .route('/')
<<<<<<< Updated upstream
  .get(authcontroller.protect, eventController.getEvents)
  .post(catchAsync(eventController.createEvent));
=======
  .get(catchAsync(eventController.getEvents))
  .post(catchAsync(eventController.createEvent))
  .delete(catchAsync(eventController.deleteEventByWeekDay));
>>>>>>> Stashed changes

eventRouter
  .route('/:id')
  .get(eventController.getEvent)
  .delete(eventController.deleteEventByIdOrWeekDay);

export { eventRouter };
