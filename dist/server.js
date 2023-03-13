"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
// Adding App
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
dotenv_1.default.config({ path: './config.env' });
// PORT DEFAULT IS 8000 OR CASE DON'T FIND IT WILL BE 3000
const port = process.env.PORT || 3000;
mongoose_1.default
    .connect(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.18t8xvs.mongodb.net/test`)
    .then(() => {
    new app_1.App().server.listen(port);
});
