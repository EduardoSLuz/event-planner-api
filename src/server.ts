/* eslint-disable no-console */
// Adding App
import dotenv from 'dotenv';
import { App } from './app';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

// PORT DEFAULT IS 8000 OR CASE DON'T FIND IT WILL BE 3000
const port = process.env.PORT || 3000;

console.log(process);
mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.18t8xvs.mongodb.net/test`
  )
  .then(() => {
    // Success message
    console.log(`Connect DB with ${process.env.USERNAME_DB} has user`);
  })
  .catch((err) => {
    // Fail message
    console.error(`Database connection error: ${err.message}`);
  });

new App().server.listen(port, () => {
  console.log(`Api is running on localhost:${port}`);
});
