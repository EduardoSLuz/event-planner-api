/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Controller from './controller';
import jwt from 'jsonwebtoken';
import User from './../models/Users';
import AppError from './../utils/appError';
import { Response } from 'express';

class authController extends Controller {
  // Function to create a token, expires in 10 days
  public signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: '10d',
    });
  };

  // Function to send a create token by signToken function, sign the token to a cookie called jwt in the response
  public createSendToken(user: any, statusCode: any, res: Response) {
    const token = this.signToken(user._id);
    const cookieOptions = {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
      status: 'Success token generate',
      data: {
        user,
      },
      token,
    });
  }

  // Middleware to protect our routes, check if we have the token in cookie, and if is a valid token
  public async protect(req: any, res: any, next: any) {
    let token;
    if (req.headers.cookie) {
      token = req.headers.cookie.split('=')[1];
    }
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }
}

export const authcontroller = new authController();
