import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";


type JwtPayload = {
  id: string;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
    (req as any).user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
