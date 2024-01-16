import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction): Response => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const loginSession = jwt.verify(token, process.env.JWT_SECRET as string);
    res.locals.loginSession = loginSession;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default auth;
