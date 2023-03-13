"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
/* eslint-disable no-console */
const express_1 = __importDefault(require("express"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_api_json_1 = __importDefault(require("./swagger/swagger-api.json"));
const userRoutes_1 = require("./routes/userRoutes");
const eventRoutes_1 = require("./routes/eventRoutes");
class App {
    constructor() {
        this.baseRoute = '/api/v1';
        this.server = (0, express_1.default)();
        this.middleware();
        this.router();
    }
    // Middlewares
    middleware() {
        /* if (process.env.NODE_ENV === 'development') {
          this.server.use(morgan('dev'));
        } */
        this.server.use(express_1.default.json());
        this.server.use(`${this.baseRoute}/docs`, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_api_json_1.default));
    }
    // Main Routes
    router() {
        this.server.use(`${this.baseRoute}/events`, eventRoutes_1.eventRouter);
        this.server.use(`${this.baseRoute}/users`, userRoutes_1.userRouter);
        this.server.all('*', (req, _, next) => {
            next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
        });
        this.server.use(errorController_1.default);
    }
}
exports.App = App;
