import { Request, Response, NextFunction } from "express";

function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  if ((req as any).user.username !== "admin") {
    next("Only accssible by admin user");
  }
  return next();
}

export default isAdminMiddleware;
