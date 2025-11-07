import { Types } from "mongoose";

export enum RentalStatus {
  REQUESTED = "REQUESTED", // by default --> auto
  
  REJECTED = "REJECTED", // owner reject for rent
  ONGOING = "ONGOING", // owner accept for renting is ongoing

  CANCELLED = "CANCELLED", // renter cancel the request

  RETURNED = "RETURNED", // renter return the item--> auto
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
