import { z } from "zod";

export const createPriceEntrySchema = z.object({
  product: z.string().nonempty({ message: "Product name is required" }),
  category: z.string().nonempty({ message: "Category is required" }),
  marketLocation: z
    .string()
    .nonempty({ message: "Market location is required" }),
  price: z.number().positive({ message: "Price must be greater than 0" }),
});
