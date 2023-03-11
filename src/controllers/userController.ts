/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../utils/appError';
import Controller from './controller';
import userModel from '../models/Users';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { authcontroller } from './authController';
import { autobind, filterObj } from './../utils/util';

class UserController extends Controller {
  // Function to create a user with the request body
  @autobind
  public async signUp(req: Request, res: Response) {
    const data = this.validBody(req) ? Object.assign(req.body) : {};
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
    if (
      !firstName ||
      !lastName ||
      !birthDate ||
      !city ||
      !country ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return this.sendError(res, 'Invalid Resquest! Missing or invalid fields');
    }

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return this.sendError(res, 'Email Already Exists!');
    }

    if (data.password !== data.confirmPassword) {
      return this.sendError(
        res,
        'Confirm Password is different from Password!'
      );
    }

    const criptoPassword = await bcrypt.hash(data.password, 14);

    const newUser = new userModel({
      firstName,
      lastName,
      birthDate,
      city,
      country,
      email,
      password: criptoPassword,
    });
    try {
      const user = await userModel.create(newUser);
      authcontroller.createSendToken(user, 201, res);
    } catch (error) {
      return res.send({
        status: res.status,
        message: 'Error in create a new user',
      });
    }
  }

  // Function to login with credentials passed by the request body, create a token with the login is a success
  @autobind
  public async signIn(req: Request, res: Response) {
    const data = this.validBody(req) ? Object.assign(req.body) : {};

    const { email, password } = data;

    if (!email || !password) {
      return this.sendError(
        res,
        'Invalid Resquest! Expected fields: Email and Password'
      );
    }

    const user = await userModel.findOne({ email }, 'email password');

    if (!user) {
      return this.sendError(res, 'User Does Not Exist!');
    }
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return this.sendError(res, 'Password incorrect, try again');
    }

    authcontroller.createSendToken(user, 200, res);
  }

  // Function to logout the user, clear the cookie with logout is a success
  public async logout(_: Request, res: Response) {
    res.clearCookie('jwt');
    return res.send({
      status: res.status,
      message: 'User Logged out',
    });
  }

  // Function to update a user (document)
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
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }

  // Function to delet a user with the ID passed by param
  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    await userModel.findByIdAndRemove(res.locals.user.id);

    res.clearCookie('jwt');
    res.status(204).json({
      status: 'success',
      message: 'User successfully removed and disconnected!',
      data: null,
    });
  }
}

export const userController = new UserController();
