import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { GoogleUser } from "../models/userModelGoogle";

interface AuthenticatedRequest extends Request {
  user?: any; // google eller vanlig user
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
      id?: string;
      _id?: string;
      sub?: string;
    };

    const userId = decoded.id || decoded._id || decoded.sub;

    if (!userId) {
      res.status(401).json({ message: "Token is missing user ID" });
      return;
    }

    const user =
      (await User.findById(userId)) || (await GoogleUser.findById(userId));

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export type { AuthenticatedRequest };
