import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async (): Promise<void> => {
  const MONGODB_URI = process.env.MONGODB_URI;
  // console.log({ MONGODB_URI });
  // const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB database");
  } catch (error: unknown) {
    let errorMessage = "Failed to connect to database";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(errorMessage);
    throw error;
  }
};

export default connectToMongoDB;
