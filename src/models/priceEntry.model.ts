import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model";
import mongooseAutoPopulate from "mongoose-autopopulate";

export interface IPriceEntry extends Document {
  product: string;
  category: string;
  marketLocation: string;
  price: number;
  submittedBy: IUser;
  createdAt: Date;
}
const PriceEntrySchema: Schema<IPriceEntry> = new Schema(
  {
    product: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    marketLocation: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: { maxDepth: 1, select: "-__v -createdAt -updatedAt" },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
PriceEntrySchema.plugin(mongooseAutoPopulate);
const PriceEntry = mongoose.model<IPriceEntry>("PriceEntry", PriceEntrySchema);

export default PriceEntry;
