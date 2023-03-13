import catchAsync from '../utils/catchAsync';
import { Router } from 'express';
import { eventController } from '../controllers/eventController';
import { authcontroller } from '../controllers/authController';

// Instance of Router, express
const eventRouter: Router = Router();

// Istance of router protected by middleware of JWT
eventRouter.use(authcontroller.protect);

//Routes

eventRouter
  .route('/')
  .get(eventController.getEvents)
  .delete(catchAsync(eventController.deleteEventByIdOrWeekDay)) // Verificar
  .post(catchAsync(eventController.createEvent));

eventRouter
  .route('/:id')
  .get(catchAsync(eventController.getEvent))
  .delete(catchAsync(eventController.deleteEventById));

export { eventRouter };
