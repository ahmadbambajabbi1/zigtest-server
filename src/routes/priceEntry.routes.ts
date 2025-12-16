import express from "express";
import {
  createPriceEntryController,
  getPriceEntriesController,
} from "../controllers/priceEntry.controller";
import { authenticatedRoute } from "../middleware/auth-middleware";

const priceEntryRouts = express.Router();

priceEntryRouts.post("/", authenticatedRoute, createPriceEntryController);
priceEntryRouts.get("/", authenticatedRoute, getPriceEntriesController);

export default priceEntryRouts;
