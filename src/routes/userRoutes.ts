import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authcontroller } from '../controllers/authController';
import catchAsync from '../utils/catchAsync';

const userRouter: Router = Router();

//Routes

userRouter.route('/signUp').post(catchAsync(userController.signUp));

userRouter.route('/signIn').post(userController.signIn);

userRouter.use(authcontroller.protect);

userRouter.route('/logout').get(userController.logout);

userRouter
  .route('/')
  .patch(catchAsync(userController.updateMe))
  .delete(catchAsync(userController.deleteMe));

export { userRouter };
