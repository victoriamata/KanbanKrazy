import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Login function to authenticate the user and generate a JWT token
export const login = async (req: Request, res: Response) => {
  // Destructure the username and password from the request body
  const { username, password } = req.body;

  // Find the user in the database by username
  const user = await User.findOne({
    where: { username }, // Searching for the user by the 'username' field
  });

  // If the user is not found, respond with a 401 Unauthorized status and an error message
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Compare the provided password with the hashed password stored in the database
  const passwordIsValid = await bcrypt.compare(password, user.password);

  // If the password doesn't match, respond with a 401 Unauthorized status and an error message
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Retrieve the secret key for signing the JWT, or use an empty string if it's not set
  const secretKey = process.env.JWT_SECRET_KEY || "";

  // Generate a JWT token containing the username, with an expiration time of 1 hour
  const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });

  // Return the generated token as a JSON response
  return res.json({ token });
};

// Create a new Express router instance
const router = Router();

// Define the POST route for user login
// This will handle POST requests to '/login' and call the login function
router.post("/login", login);

// Export the router so it can be used in other parts of the application
export default router;
