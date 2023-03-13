"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authcontroller = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("./../models/Users"));
const appError_1 = __importDefault(require("./../utils/appError"));
class authController {
    constructor() {
        this.signToken = (id) => {
            return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
                expiresIn: '10d',
            });
        };
    }
    createSendToken(id, res) {
        const token = this.signToken(id);
        const cookieOptions = {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.cookie('jwt', token, cookieOptions);
        return token;
    }
    async protect(req, res, next) {
        let token;
        if (req.headers.cookie) {
            token = req.headers.cookie.split('=')[1];
        }
        if (!token) {
            return next(new appError_1.default('You are not logged in! Please log in to get access.', 401));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const currentUser = await Users_1.default.findById(decoded.id);
        if (!currentUser) {
            return next(new appError_1.default('The user belonging to this token does no longer exist.', 401));
        }
        // req.user = currentUser;
        res.locals.user = currentUser;
        next();
    }
}
exports.authcontroller = new authController();
