import {
  loginSchema,
  signupSchema,
} from "../validations/auth.validation.schema";
import asyncHandler from "../utils/asyncHandler";
import User from "../models/user.model";
import AuthServices from "../services/auth.services";
import { isFloat32Array } from "util/types";

class UserController {
  login = asyncHandler(async (req, res) => {
    const body = req.body;
    const validate = loginSchema.safeParse(body);
    if (!validate.success) {
      return res.status(400).json({
        status: "error",
        message: "Invalid request data",
        issues: validate.error.issues,
        erros: validate.error,
      });
    }
    const user = await AuthServices.verifyUser(
      validate.data.email,
      validate.data.password
    );
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }
    const accessToken = await AuthServices.generateToken({
      userId: user._id,
      email: user.email,
      name: user.name,
    });
    const responseData = {
      user: user,
      accessToken: accessToken,
    };
    return res.status(200).json({
      status: "success",
      message: "User created successfully",
      user,
      accessToken,
    });
  });
  signup = asyncHandler(async (req, res) => {
    const body = req.body;
    const validate = signupSchema.safeParse(body);
    if (!validate.success) {
      return res.status(400).json({
        status: "error",
        message: "Invalid request data",
        issues: validate.error.issues,
        erros: validate.error,
      });
    }
    const hashPassword = await AuthServices.hashPassword(
      validate.data.password
    );
    const newUser = await User.create({
      ...validate.data,
      password: hashPassword,
    });
    if (!newUser) {
      return res
        .status(400)
        .json({ status: "error", message: "User creation failed" });
    }
    const accessToken = await AuthServices.generateToken({
      userId: newUser._id,
      email: newUser.email,
      name: newUser.name,
    });
    const responseData = {
      user: newUser,
      accessToken: accessToken,
    };
    return res.status(200).json({
      status: "success",
      message: "User created successfully",
      newUser,
      accessToken,
    });
  });
  async getUser() {}
}

const userController = new UserController();

export default userController;
