import { Request, Response } from 'express';

export default class Controller {
  public validBody(req: Request) {
    try {
      Object.assign(req.body);
      return true;
    } catch (err) {
      return false;
    }
  }

  public sendError(
    res: Response,
    msg: string,
    statusCode = 404,
    status = 'Fail'
  ) {
    return res.status(statusCode).json({
      status: status,
      message: msg,
    });
  }
}
