import mongoose from 'mongoose';

// Schema of User document in mongoDB
const eventSchema = new mongoose.Schema({
  // Field's
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  dayOfWeek: {
    type: String,
    required: [true, 'DayOfWeek is required'],
    enum: {
      values: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ],
      message:
        'DayOfWeek is either: sunday, monday, tuesday, wednesday, thursday, friday, saturday',
    },
  },
  dateTime: {
    type: Date,
    required: [true, 'DateTime is required'],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: [true, 'Event must belong to the current user.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

eventSchema.pre(/^find/, function (next) {
  this.find().select('-__v -user').sort('dateTime createdAt');
  next();
});

// Export Schema to create a Model
const eventModel = mongoose.model('Event', eventSchema);

export default eventModel;
