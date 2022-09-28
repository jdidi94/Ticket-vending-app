import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface UserPayload {
  id: string;
  email: string;
}
declare module golobal {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session!.jwt) {
    return next();
  }
  try {
    // @ts-ignore
    const payload = jwt.sign(req.session.jwt, process.env.JWT_KEY!);
    //@ts-ignore
    req.currentUser = payload;
  } catch (err) {}
  next();
};
