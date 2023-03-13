"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import bcrypt from 'bcrypt';
// Schema of User document
const userSchema = new mongoose_1.default.Schema({
    // Field's
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    birthDate: Date,
    city: String,
    country: String,
    email: {
        type: String,
        required: [true, 'E-mail is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    active: {
        type: Boolean,
        default: true,
    },
});
// userSchema.methods.validatePassword = async function (
//   candidatePassword: string,
//   userPassword: string
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };
// Export Schema to create a Model
const userModel = mongoose_1.default.model('User', userSchema);
exports.default = userModel;
