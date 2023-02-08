const fs = require('fs');

const urlEvents = `${__dirname}/../dev-data/events.json`;
const events = JSON.parse(fs.readFileSync(urlEvents));

const weekDays = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

exports.checkID = (req, res, next, val) => {
  console.log(`Event id is: ${val}`);

  next();
};

// GET ALL EVENTS
exports.getAllEvents = (req, res) => {
  res.status(200).json(events);
};

// GET EVENTS BY WEEKDAY OR ID
exports.getEventsByWeekId = (req, res) => {
  const { id } = req.params;

  if (!(id * 1)) {
    const day = weekDays[id];
    const wEvents = events.filter(
      (el) => new Date(el.dateTime).getDay() === day
    );

    if (wEvents.length > 0) return res.status(200).json(wEvents);
  } else {
    const event = events.find((el) => el._id === id);
    if (event) return res.status(200).json(event);
  }

  res.status(404).json({
    status: 'Fail',
    msg: 'No events found!',
  });
};

// POST CREATE EVENT
exports.createEvent = (req, res) => {
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

  fs.writeFile(urlEvents, JSON.stringify(events), (error) => {
    res.status(201).json({
      status: 'OK',
      message: 'The event has been successfully registered!',
      data: {
        event: newEvent,
      },
    });
  });
};

// DELETE EVENT BY ID
exports.deleteEventById = (req, res) => {
  const { id } = req.params;
  const delEvent = events.find((el) => el._id === id);
  const newEvents = events.filter((el) => el._id !== id);

  if (!delEvent)
    return res.status(404).json({
      status: 'Fail',
      msg: 'No events found!',
    });

  fs.writeFile(urlEvents, JSON.stringify(newEvents), (error) => {
    res.status(200).json({
      status: 'OK',
      msg: 'The event has been successfully deleted!',
      data: {
        event: delEvent,
      },
    });
  });
};

// DELETE EVENTS BY WEEKDAY
exports.deleteEventsByDayWeek = (req, res) => {
  const { id } = req.params;
  const day = weekDays[id];

  const delEvents = events.filter(
    (el) => new Date(el.dateTime).getDay() === day
  );
  const newEvents = events.filter(
    (el) => new Date(el.dateTime).getDay() !== day
  );

  if (delEvents.length === 0)
    return res.status(404).json({
      status: 'Fail',
      msg: 'No events found!',
    });

  fs.writeFile(urlEvents, JSON.stringify(newEvents), (error) => {
    res.status(200).json({
      status: 'OK',
      msg: 'The events has been successfully deleted!',
      data: {
        events: delEvents,
      },
    });
  });
};
