import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import  User  from "../models/userModel";
import { GoogleUser } from "../models/userModelGoogle";

interface AuthenticatedRequest extends Request {
  user?: any; //google eller vanlig user
}

<<<<<<< HEAD
export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // jwt debug
=======
export const authMiddleware: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
>>>>>>> oAuth-model-db

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return; 
  }

  try {
<<<<<<< HEAD
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  console.log('🔍 Decoded JWT payload:', decoded);

  const userId = (decoded as any).id || (decoded as any)._id || (decoded as any).sub;

  if (!userId) {
    res.status(401).json({ message: 'Token is missing user ID' });
=======
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
>>>>>>> oAuth-model-db
    return;
  }

  (req as AuthenticatedRequest).user = { _id: userId };
  next();
} catch (err) {
  console.error("❌ JWT verification failed:", err);
  res.status(401).json({ message: 'Token is not valid' });
}
};

export type { AuthenticatedRequest };
