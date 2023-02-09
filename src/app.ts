import express from 'express';
// import morgan from 'morgan';
// import dotenv from 'dotenv';

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
    // if (process.env.NODE_ENV === 'development') {
    //   app.use(morgan('dev'));
    // }
    this.server.use(express.json());
  }

  // Main Routes
  private router() {
    this.server.use(`${this.baseRoute}`, eventRouter);
    this.server.use(`${this.baseRoute}/users`, userRouter);
    // app.use(`${this.baseRoute}`, eventRouter);
    // app.use(`${this.baseRoute}/users`, userRouter);
  }
}
