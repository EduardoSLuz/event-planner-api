import { Router } from 'express';
import { userController } from '../controllers/userController';

const userRouter: Router = Router();

//Routes

// userRouter.use();

userRouter.route('/signUp').post(userController.signUp);

userRouter.route('/signIn').post(userController.signIn);

export { userRouter };
