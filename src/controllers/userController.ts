import { Request, Response } from 'express';
import fs from 'fs';

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
const users = JSON.parse(fs.readFileSync(urlUsers, 'utf8'));

class UserController {
  // POST USERS SIGN UP
  public signUp(req: Request, res: Response) {
    const data = Object.assign(req.body);

    if (
      !data.firstName ||
      !data.lastName ||
      !data.birthDate ||
      !data.city ||
      !data.country ||
      !data.email ||
      !data.password ||
      !data.country ||
      !data.confirmPassword
    )
      return res.status(404).json({
        status: 'Fail',
        message: 'Invalid Resquest!',
      });

    const emailExists = users.find((el: User) => el.email === data.email);

    if (emailExists)
      return res.status(404).json({
        status: 'Fail',
        message: 'Email Already Exists!',
      });

    if (data.password !== data.confirmPassword)
      return res.status(404).json({
        status: 'Fail',
        message: 'ConfirmPassword is different from Password!',
      });

    const newId =
      users.length > 0 && users[users.length - 1]._id
        ? `${users[users.length - 1]._id * 1 + 1}`
        : '1';

    const newUser: User = {
      _id: newId,
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
    });
  }

  // POST USERS SIGN IN
  public signIn(req: Request, res: Response) {
    const data = Object.assign(req.body);

    if (!data.email || !data.password)
      return res.status(404).json({
        status: 'Fail',
        message: 'Invalid Resquest!',
      });

    const userExist = users.find(
      (el: User) => el.email === data.email && el.password === data.password
    );

    if (!userExist)
      return res.status(404).json({
        status: 'Fail',
        message: 'User Does Not Exist!',
      });

    const resUser = {
      _id: userExist._id,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      email: userExist.email,
    };

    return res.status(200).json({
      status: 'OK',
      message: 'The user has been successfully logged in!',
      data: {
        user: resUser,
      },
    });
  }
}

export const userController = new UserController();
