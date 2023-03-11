import catchAsync from '../utils/catchAsync';
import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authcontroller } from '../controllers/authController';

const userRouter: Router = Router();

//Routes

userRouter
  .route('/')
  .delete(authcontroller.protect, catchAsync(userController.deleteMe))
  .patch(authcontroller.protect, catchAsync(userController.updateMe));

userRouter.route('/signUp').post(userController.signUp);
userRouter.route('/signIn').post(userController.signIn);
userRouter.route('/logout').get(authcontroller.protect, userController.logout);

export { userRouter };
