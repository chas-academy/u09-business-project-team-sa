import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import  User  from "../models/userModel";
import { GoogleUser } from "../models/userModelGoogle";

interface AuthenticatedRequest extends Request {
  user?: any; //google eller vanlig user
}

export const authMiddleware: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user =
      (await User.findById(decoded.id)) ||
      (await GoogleUser.findById(decoded.id));

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = user; // hela användarobjektet
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
    return;
  }
};

export type { AuthenticatedRequest };
