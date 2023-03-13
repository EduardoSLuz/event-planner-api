/* eslint-disable no-console */
import express from 'express';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger/swagger-api.json';
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
    /* if (process.env.NODE_ENV === 'development') {
      this.server.use(morgan('dev'));
    } */
    this.server.use(express.json());
    this.server.use(
      `${this.baseRoute}/docs`,
      swaggerUi.serve,
      swaggerUi.setup(swaggerFile)
    );
  }

  // Main Routes
  private router() {
    this.server.use(`${this.baseRoute}/events`, eventRouter);
    this.server.use(`${this.baseRoute}/users`, userRouter);

    this.server.all('*', (req, _, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });

    this.server.use(globalErrorHandler);
  }
}
