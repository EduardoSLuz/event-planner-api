"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const util_1 = require("./../utils/util");
const Users_1 = __importDefault(require("../models/Users"));
const authController_1 = require("./authController");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    async signUp(req, res, next) {
        const data = Object.assign(req.body);
        const { firstName, lastName, birthDate, city, country, email, password, confirmPassword, } = data;
        const userExist = await Users_1.default.findOne({ email });
        if (userExist) {
            return next(new appError_1.default('Email Already Exists!', 401));
        }
        if (password !== confirmPassword) {
            return next(new appError_1.default('Confirm Password is different from Password!', 401));
        }
        const criptoPassword = await bcrypt_1.default.hash(password, 14);
        const newUser = new Users_1.default({
            firstName,
            lastName,
            birthDate,
            city,
            country,
            email,
            password: criptoPassword,
        });
        const user = await Users_1.default.create(newUser);
        const token = authController_1.authcontroller.createSendToken(user.id, res);
        res.status(201).json({
            status: 'success',
            message: 'User created and successfully logged in!',
            data: {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthDate: user.birthDate,
                    city: user.city,
                    country: user.country,
                    email: user.email,
                    active: user.active,
                },
            },
            token,
        });
    }
    // POST USERS SIGN IN
    async signIn(req, res, next) {
        const data = Object.assign(req.body);
        const { email, password } = data;
        if (!email || !password) {
            return next(new appError_1.default('Invalid Resquest! Expected Email and Password', 401));
        }
        const user = await Users_1.default.findOne({ email }).select('+password');
        if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
            return next(new appError_1.default('Incorrect email or password!', 401));
        }
        let message = 'User logged in successfully!';
        if (!user.active) {
            await Users_1.default.findByIdAndUpdate(user.id, { active: true });
            message = 'User reactivated and successfully logged in!';
        }
        const token = authController_1.authcontroller.createSendToken(user.id, res);
        res.status(200).json({
            status: 'success',
            message,
            token,
        });
    }
    // POST CURRENT USER LOGOUT
    async logout(_, res) {
        res.clearCookie('jwt');
        return res.send({
            status: res.status,
            message: 'User Logged out',
        });
    }
    // PATCH CURRENT USER UPDATE
    async updateMe(req, res, next) {
        if (req.body.password || req.body.passwordConfirm) {
            return next(new appError_1.default('Its not allowed to update password by this route!', 401));
        }
        const filteredBody = (0, util_1.filterObj)(req.body, 'firstName', 'lastName', 'birthDate', 'city', 'country', 'email');
        const updatedUser = await Users_1.default
            .findByIdAndUpdate(res.locals.user.id, filteredBody, {
            new: true,
            runValidators: true,
        })
            .select('-__v -password -_id');
        res.status(200).json({
            status: 'success',
            message: 'User successfully updated!',
            data: {
                user: updatedUser,
            },
        });
    }
    // DELETE CURRENT USER UPDATE
    async deleteMe(req, res, next) {
        await Users_1.default.findByIdAndUpdate(res.locals.user.id, { active: false });
        res.clearCookie('jwt');
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
}
exports.userController = new UserController();
