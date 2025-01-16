// @ts-types="npm:@types/express@4"
import { NextFunction, Request, Response } from "express";

const reqLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.info(`${req.method} request to "${req.url}" by ${req.hostname}`);
  next();
};

export default reqLogger;
