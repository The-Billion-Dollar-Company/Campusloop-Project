import { Types } from "mongoose";

export enum RentalStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED", // owner accept for rent
  REJECTED = "REJECTED", // owner reject for rent
  CANCELLED = "CANCELLED", // renter cancel the request
  ONGOING = "ONGOING", // renting is ongoing
  RETURNED = "RETURNED", // renter return the item
}

export interface IRental {
  _id?: Types.ObjectId;
  itemId: Types.ObjectId;
  renterId: Types.ObjectId;
  ownerId: Types.ObjectId;

  startDate: Date; // rental start
  endDate: Date; // rental end
  returnDate?: Date; // actual return time

  totalAmount: number;
  depositAmount: number;

  status: RentalStatus;
  notes?: string;
}
