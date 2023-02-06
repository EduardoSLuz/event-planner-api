const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.param('id', eventController.checkID);

router
  .route('/events')
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

router
  .route('/events/:id')
  .get(eventController.getEventsByWeekId)
  .delete(eventController.deleteEventsByWeek);

router.route('/event/:id').delete(eventController.deleteEventById);

module.exports = router;
