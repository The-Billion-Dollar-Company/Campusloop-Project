import { model, Schema } from "mongoose";
import { IRental, RentalStatus } from "../rental/rental.interface";

const rentalSchema = new Schema<IRental>(
  {
    renterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    depositAmount: {
      type: Number,
      min: 0,
      default: 0,
      required: true,

    },
    status: {
      type: String,
      enum: Object.values(RentalStatus),
      default: RentalStatus.REQUESTED,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Rental = model<IRental>("Rental", rentalSchema);
