import { Router } from 'express';
import { eventController } from '../controllers/eventController';

const eventRouter: Router = Router();

//Routes
// router.param('id', eventController.checkID);

eventRouter
  .route('/events')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

eventRouter
  .route('/events/:id')
  .get(eventController.getEventsByWeekId)
  .delete(eventController.deleteEventsByDayWeek);

eventRouter.route('/event/:id').delete(eventController.deleteEventById);

export { eventRouter };
