/* eslint-disable no-console */
// Adding App
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { App } from './app';

dotenv.config({ path: './config.env' });

// PORT DEFAULT IS 8000 OR CASE DON'T FIND IT WILL BE 3000
const port = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.18t8xvs.mongodb.net/test`
  )
  .then(() => {
    new App().server.listen(port);
  });
