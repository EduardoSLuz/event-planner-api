/* eslint-disable no-console */
import { Request, Response } from 'express';
import Controller from './controller';
import { autobind } from './../utils/util';
import userModel from '../models/Users';
/* import fs from 'fs'; */

/* 
  Não precisa mais porque ele vai comparar com o modelo que está no Schema do BD
  type User = {
    _id: string; 
    firstName: string;
    lastName: string;
    birthDate: string;
    city: string;
    country: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  const urlUsers = `${__dirname}/../../dev-data/users.json`;
  Não precisa mais porque os documentos serão salvos remotamente
  const users = JSON.parse(fs.readFileSync(urlUsers, 'utf8'));
  */

class UserController extends Controller {
  // POST USERS SIGN UP
  @autobind
  public signUp(req: Request, res: Response) {
    const data = this.validBody(req) ? Object.assign(req.body) : {};
    if (
      !data.firstName ||
      !data.lastName ||
      !data.birthDate ||
      !data.city ||
      !data.country ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      return this.sendError(res, 'Invalid Resquest!');
    }
    const emailExists = userModel.find({ email: data.email });
    if (!emailExists) {
      return this.sendError(res, 'Email Already Exists!');
    }
    if (data.password !== data.confirmPassword) {
      return this.sendError(res, 'ConfirmPassword is different from Password!');
    }

    //TODO: ...data
    const user = new userModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      city: req.body.city,
      country: req.body.country,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    user
      .save()
      .then(() => {
        // Success message if all right
        return res.send({
          status: res.status,
          message: 'The user has been successfully registered!',
          data: {
            user: data.firstName,
          },
        });
      })
      .catch(() => {
        // Fail message if somenthing gone's wrong
        return res.send({
          status: res.status,
          message: 'Error',
        });
      });
    /* 
    Não é mais necessário, mongodb trabalha com ID automaticamente fornecido por ele
    Não precisa mais porque os documentos serão salvos remotamente
    
    const newId =
      users.length > 0 && users[users.length - 1]._id
        ? `${users[users.length - 1]._id * 1 + 1}`
        : '1';

     const newUser: User = {
      firstName: `${data.firstName}`,
      lastName: `${data.lastName}`,
      birthDate: `${data.birthDate}`,
      city: `${data.city}`,
      country: `${data.country}`,
      email: `${data.email}`,
      password: `${data.password}`,
      confirmPassword: `${data.confirmPassword}`,
    }; 
      users.push(newUser);
      fs.writeFile(urlUsers, JSON.stringify(users), () => {
      newUser.password = '*******';
      newUser.confirmPassword = newUser.password;

      return res.status(201).json({
        status: 'OK',
        message: 'The user has been successfully registered!',
        data: {
          user: newUser,
        },
      });
    }); */
  }

  @autobind
  public async signIn(req: Request, res: Response) {
    const data = this.validBody(req) ? Object.assign(req.body) : {};

    if (!data.email || !data.password) {
      return this.sendError(
        res,
        'Invalid Resquest! Expected fields: email password'
      );
    }

    const userExist = await userModel.find(
      {
        email: data.email,
      },
      'email password'
    );
    if (userExist.length == 0) {
      return this.sendError(res, 'User Does Not Exist!');
    }

    if (data.password != userExist[0].password) {
      return this.sendError(res, 'Password incorrect');
    }

    return res.status(200).json({
      status: 'OK',
      message: 'The user has been successfully logged in!',
      data: {
        user: 'OK',
      },
    });
  }
}

export const userController = new UserController();
