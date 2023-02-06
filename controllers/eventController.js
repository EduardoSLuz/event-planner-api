const events = [
  {
    _id: '1',
    description: 'lalalal',
    dateTime: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    description: 'lelelel',
    dateTime: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

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
    return res.status(200).json(events);
  }

  const event = events.find((el) => el._id === id);
  res.status(200).json(event);
};

// POST CREATE EVENT
exports.createEvent = (req, res) => {
  const data = Object.assign(req.body);

  res.status(201).json({
    status: 'OK',
    msg: 'The event has been successfully registered!',
    data: {
      event: data,
    },
  });
};

// DELETE EVENT BY ID
exports.deleteEventById = (req, res) => {
  const { id } = req.params;
  const event = events.find((el) => el._id === id);

  res.status(200).json({
    status: 'OK',
    msg: 'The event has been successfully deleted!',
    data: {
      event: event,
    },
  });
};

// DELETE EVENTS BY WEEKDAY
exports.deleteEventsByWeek = (req, res) => {
  const { id } = req.params;
  console.log(id);

  res.status(200).json({
    status: 'OK',
    msg: 'The events has been successfully deleted!',
    data: {
      events: events,
    },
  });
};
