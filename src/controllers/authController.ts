/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from './../models/Users';
import AppError from './../utils/appError';

class authController {
  public signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: '10d',
    });
  };

  public createSendToken(id: string, res: Response) {
    const token = this.signToken(id);
    const cookieOptions = {
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie('jwt', token, cookieOptions);

    return token;
  }

  public async protect(req: Request, res: Response, next: NextFunction) {
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

    // req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }
}

export const authcontroller = new authController();
