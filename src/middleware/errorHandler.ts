import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.error("Error caught by errorHandler:", {
    message: err.message,
    stack: err.stack,
    name: err.name,
    ...(err as any),
  });

  // Default error message
  console.log("erro happen and erro middleware.", err);
  let statusCode = 500;
  let message = "Internal Server Error";
  
  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  } else if (err.name === "MongoError") {
    // @ts-ignore
    if (err.code === 11000) {
      // Duplicate key error
      statusCode = 409;
      message = "Duplicate entry";
    }
  }
  // console.log("errorHandler called:", err);
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "production" && { stack: err.stack }),
  });
};
