/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import { filterObj } from './../utils/util';
import userModel from '../models/Users';
import { authcontroller } from './authController';
import bcrypt from 'bcrypt';

class UserController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    const data = Object.assign(req.body);
    const {
      firstName,
      lastName,
      birthDate,
      city,
      country,
      email,
      password,
      confirmPassword,
    } = data;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return next(new AppError('Email Already Exists!', 400));
    }

    if (password !== confirmPassword) {
      return next(
        new AppError('Confirm Password is different from Password!', 400)
      );
    }

    const criptoPassword = await bcrypt.hash(password, 14);

    const newUser = new userModel({
      firstName,
      lastName,
      birthDate,
      city,
      country,
      email,
      password: criptoPassword,
    });

    const user = await userModel.create(newUser);
    const token = authcontroller.createSendToken(user.id, res);

    const filteredData = filterObj(
      user,
      'firstName',
      'lastName',
      'birthDate',
      'city',
      'country',
      'email',
      'active'
    );

    res.status(201).json({
      status: 'success',
      message: 'User created and successfully logged in!',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        city: user.city,
        country: user.country,
        email: user.email,
        active: user.active,
      },
      token,
    });
  }

  // POST USERS SIGN IN
  public async signIn(req: Request, res: Response, next: NextFunction) {
    const data = Object.assign(req.body);
    const { email, password } = data;

    if (!email || !password) {
      return next(
        new AppError('Invalid Resquest! Expected Email and Password', 401)
      );
    }

    const user = await userModel.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError('Incorrect email or password!', 401));
    }

    let message = 'User logged in successfully!';

    if (!user.active) {
      await userModel.findByIdAndUpdate(user.id, { active: true });
      message = 'User reactivated and successfully logged in!';
    }

    const token = authcontroller.createSendToken(user.id, res);

    res.status(200).json({
      status: 'success',
      message,
      token,
    });
  }

  // POST CURRENT USER LOGOUT
  public async logout(_: Request, res: Response) {
    res.clearCookie('jwt');
    return res.send({
      status: res.status,
      message: 'User Logged out',
    });
  }

  // PATCH CURRENT USER UPDATE
  public async updateMe(req: Request, res: Response, next: NextFunction) {
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError('Its not allowed to update password by this route!', 400)
      );
    }

    const filteredBody = filterObj(
      req.body,
      'firstName',
      'lastName',
      'birthDate',
      'city',
      'country',
      'email'
    );

    const updatedUser = await userModel
      .findByIdAndUpdate(res.locals.user.id, filteredBody, {
        new: true,
        runValidators: true,
      })
      .select('-__v -password -_id');

    res.status(200).json({
      status: 'OK',
      message: 'User successfully updated!',
      data: {
        user: updatedUser,
      },
    });
  }

  // DELETE CURRENT USER UPDATE
  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    await userModel.findByIdAndUpdate(res.locals.user.id, { active: false });

    res.clearCookie('jwt');
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
}

export const userController = new UserController();
