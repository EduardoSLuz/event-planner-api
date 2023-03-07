/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

// Adding Routes
import { userRouter } from './routes/userRoutes';
import { eventRouter } from './routes/eventRoutes';

export class App {
  public server: express.Application;
  private baseRoute = '/api/v1';

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  // Middlewares
  private middleware() {
    if (process.env.NODE_ENV === 'development') {
      this.server.use(morgan('dev'));
    }
    this.server.use(express.json());
  }

  // Main Routes
  private router() {
    this.server.use(`${this.baseRoute}/events`, eventRouter);
    this.server.use(`${this.baseRoute}/users`, userRouter);
  }

  private connectionDB() {
    mongoose
      .connect(
        `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.18t8xvs.mongodb.net/test`
      )
      .then(() => {
        // Success message
        console.log(`Connect DB with ${process.env.USERNAME} has user`);
      })
      .catch((err) => {
        // Fail message
        console.error(`Database connection error: ${err.message}`);
      });
  }
}
