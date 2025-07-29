import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: { _id: string };
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  console.log('JWT_SECRET:', process.env.JWT_SECRET); // jwt debug

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  console.log('🔍 Decoded JWT payload:', decoded);

  const userId = (decoded as any).id || (decoded as any)._id || (decoded as any).sub;

  if (!userId) {
    res.status(401).json({ message: 'Token is missing user ID' });
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