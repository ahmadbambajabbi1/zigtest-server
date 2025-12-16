import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userServices from "./user.services";
import { IUser } from "@/models/user.model";

class AuthServices {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
  static async generateToken(payload: object): Promise<string> {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    } catch (error) {
      throw new Error("Failed to generate token");
    }
  }

  static async verifyUser(email: string, password: string): Promise<IUser> {
    try {
      const user = await userServices.getUserByEmailWithPassword(email);
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await this.comparePassword(
        password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const userWithoutPassword = await userServices.getUserByEmail(email);
      return userWithoutPassword as any;
    } catch (error) {
      throw new Error("Failed to verify user");
    }
  }
}

export default AuthServices;
