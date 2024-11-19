import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  try {
    // Verify the token
    const SECRET_KEY = process.env.JWT_SECRET_KEY || ''
     
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    // Attach user data to the request object
    req.user = {
      username: decoded.username
    };

    // Proceed to the next middleware
    return next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

