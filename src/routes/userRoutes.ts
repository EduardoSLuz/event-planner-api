import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authcontroller } from '../controllers/authController';
import catchAsync from '../utils/catchAsync';

const userRouter: Router = Router();

//Routes

userRouter.route('/signUp').post(userController.signUp);

userRouter.route('/signIn').post(userController.signIn);

userRouter.route('/logout').get(authcontroller.protect, userController.logout);

userRouter
  .route('/')
  .patch(authcontroller.protect, catchAsync(userController.updateMe));

export { userRouter };
