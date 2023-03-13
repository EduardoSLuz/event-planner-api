"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Schema of User document in mongoDB
const eventSchema = new mongoose_1.default.Schema({
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
            message: 'DayOfWeek is either: sunday, monday, tuesday, wednesday, thursday, friday, saturday',
        },
    },
    dateTime: {
        type: Date,
        required: [true, 'DateTime is required'],
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
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
const eventModel = mongoose_1.default.model('Event', eventSchema);
exports.default = eventModel;
