import PriceEntry, { IPriceEntry } from "../models/priceEntry.model";
import { IUser } from "../models/user.model";

export const createPriceEntry = async (
  validatedData: {
    product: string;
    category: string;
    marketLocation: string;
    price: number;
  },
  user: IUser
): Promise<IPriceEntry> => {
  const { product, category, marketLocation, price } = validatedData;

  const newPriceEntry = new PriceEntry({
    product,
    category,
    marketLocation,
    price,
    submittedBy: user._id,
  });

  await newPriceEntry.save();
  return newPriceEntry;
};

export const getPriceEntries = async (): Promise<IPriceEntry[]> => {
  return PriceEntry.find()
    .populate("submittedBy", "name email")
    .sort({ createdAt: -1 });
};
