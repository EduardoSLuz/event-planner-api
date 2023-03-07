/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';

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
}
