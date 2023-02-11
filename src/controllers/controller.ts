import { Request, Response } from 'express';

export class Controller {
  public validBody(req: Request, res: Response) {
    try {
      Object.assign(req.body);
    } catch (err) {
      return this.sendError(res, 'Body Error', 'Error');
    }
  }

  public sendError(res: Response, msg: string, status = 'Fail') {
    return res.status(404).json({
      status: status,
      message: msg,
    });
  }
}
