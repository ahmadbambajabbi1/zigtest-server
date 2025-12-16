import { Router } from "express";
import authRouter from "./auth.routes";
import priceEntryRouts from "./priceEntry.routes";

const routes = Router();

// Routes
routes.use("/auth", authRouter); // Authentication routes
routes.use("/price-entry", priceEntryRouts); // Authentication routes

export default routes;
