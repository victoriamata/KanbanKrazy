//activity 25 boilerplate
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define an interface for the expected structure of the JWT payload
interface JwtPayload {
  username: string;
}

// Middleware function to authenticate a JWT token in incoming requests
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Retrieve the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists
  if (authHeader) {
    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    // Fetch the secret key for verifying the token, defaulting to an empty string if undefined
    const secretKey = process.env.JWT_SECRET_KEY || "";

    // Verify the token using the secret key
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        // If token verification fails, respond with a 403 Forbidden status
        return res.sendStatus(403);
      }

      // If verification is successful, attach the decoded user information to the `req` object
      req.user = user as JwtPayload;

      // Proceed to the next middleware or route handler
      return next();
    });
  } else {
    // If the Authorization header is missing, respond with a 401 Unauthorized status
    res.sendStatus(401);
  }
};
