import { Request, Response } from "express";
import {
  createPriceEntry,
  getPriceEntries,
} from "../services/priceEntry.services";
import { createPriceEntrySchema } from "../validations/priceEntry.validation.schema";

export const createPriceEntryController = async (
  req: Request,
  res: Response
) => {
  try {
    const validatedData = createPriceEntrySchema.parse(req.body);
    console.log({ validatedData });
    const priceEntry = await createPriceEntry(validatedData, req.user);
    return res.status(201).json({
      status: "success",
      message: "Price entry created successfully",
      data: priceEntry,
    });
  } catch (error: any) {
    console.log({ error });
    return res.status(400).json({
      status: "error",
      message: error.errors ? error.errors[0].message : "Something went wrong",
    });
  }
};

export const getPriceEntriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const priceEntries = await getPriceEntries();
    return res.status(200).json({
      status: "success",
      data: priceEntries,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Failed to fetch price entries",
    });
  }
};
