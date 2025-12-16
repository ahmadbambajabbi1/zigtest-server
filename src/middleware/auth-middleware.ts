import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
interface DecodedToken {
  userId: string;
  role: string;
}
async function authenticatedRoute(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void | Response> {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({
        message: "Authentication required. Bearer token missing.",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token || token === "undefined" || token === "null") {
      return response.status(401).json({
        message: "Invalid token format.",
      });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return response.status(500).json({
        message: "Server configuration error.",
      });
    }
    const decoded = (await jwt.verify(token, jwtSecret)) as DecodedToken;
    const { userId } = decoded;
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ message: "Invalid Token Payload" });
    }
    if (!user || !user._id) {
      return response.status(401).json({
        message: "Invalid token payload.",
      });
    }
    request.user = user;
    request.userId = user._id.toString();
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return response.status(401).json({
        message: "Authentication token has expired. Please log in again.",
      });
    } else if (error instanceof JsonWebTokenError) {
      return response.status(401).json({
        message: "Invalid authentication token.",
      });
    }
    return response.status(500).json({
      message: "Internal server error during authentication.",
    });
  }
}

export { authenticatedRoute };
