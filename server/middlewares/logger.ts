import { NextFunction, Request, Response } from "npm:express@4.18.2";

const reqLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.info(`${req.method} request to "${req.url}" by ${req.hostname}`);
  next();
};

export default reqLogger;
