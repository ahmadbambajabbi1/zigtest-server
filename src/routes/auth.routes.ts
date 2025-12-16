import userController from "../controllers/user.controllers";
import { Router } from "express";

const authRouter = Router();

// Routes
authRouter.get("/", userController.login);
authRouter.post("/login", userController.login);
authRouter.post("/signup", userController.signup);

export default authRouter;
