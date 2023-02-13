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

  public sendError(res: Response, msg: string, status = 'Fail') {
    return res.status(404).json({
      status: status,
      message: msg,
    });
  }
}
