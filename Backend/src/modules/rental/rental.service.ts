import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { IRental, RentalStatus } from "./rental.interface";
import httpStatus from "http-status-codes";
import { Rental } from "./rental.model";
import { Item } from "../item/item.model";
import { Availability } from "../item/Item.interface";
import mongoose from "mongoose";

const createRental = async (payload: IRental, userId: string) => {
  if (
    !payload.ownerId ||
    !payload.renterId ||
    !payload.itemId ||
    !payload.startDate ||
    !payload.endDate ||
    !payload.depositAmount ||
    !payload.totalAmount
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Missing required fields for item creation"
    );
  }

  const renterUser = await User.findById(userId); // userId = logged user through jwt
  if (!renterUser) {
    throw new AppError(httpStatus.BAD_GATEWAY, "User not found");
  }

  if (payload.ownerId === payload.renterId) {
    throw new AppError(httpStatus.BAD_GATEWAY, "User cannot rent his own item");
  }

  if (payload.renterId.toString() !== userId) {
    throw new AppError(
      httpStatus.BAD_GATEWAY,
      "You are not allowed to rent from this account"
    );
  }

  const isItem = await Item.findById(payload.itemId);
  if (!isItem) {
    throw new AppError(httpStatus.NOT_FOUND, "Item is not found");
  }

  const rent = await Rental.create(payload);
  renterUser.rentals = renterUser.rentals || [];
  renterUser.rentals.push(rent._id);

  await renterUser.save();

  return rent;
};

const allRentals = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.BAD_GATEWAY, "User not found");
  }

  const rentals = await Rental.find({ renterId: userId })
    .populate("itemId", "title price picture")
    .populate("ownerId", "name email picture")
    .lean();

  return rentals;
};

const rentalInfoById = async (rentalId: string, userId: string) => {
  const rental = await Rental.findById(rentalId)
    .populate("itemId", "title price picture")
    .populate("ownerId", "name email picture")
    .populate("renterId", "name email picture")
    .lean();

  if (!rental) throw new AppError(httpStatus.NOT_FOUND, "Rental not found");
  if (rental.renterId._id.toString() !== userId)
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to view this rental"
    );

  return rental;
};

const updateRentalStatus = async (
  rentalId: string,
  userId: string,
  status: RentalStatus
) => {
  const session = await mongoose.startSession(); // transaction
  session.startTransaction();

  try {
    const rental = await Rental.findById(rentalId).session(session);
    if (!rental) throw new AppError(httpStatus.NOT_FOUND, "Rental not found");

    const item = await Item.findById(rental.itemId).session(session);
    if (!item) {
      throw new AppError(httpStatus.NOT_FOUND, "Item not found");
    }

    const isOwner = rental.ownerId.toString() === userId;
    const isRenter = rental.renterId.toString() === userId;

    if (!isOwner && !isRenter)
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not allowed to update this rental"
      );

    // --- Owner actions ---
    if (isOwner) {
      if (rental.status === RentalStatus.REQUESTED && status === RentalStatus.ONGOING) {
        rental.status = RentalStatus.ONGOING;
        item.availability = Availability.RENTED;
      } else if(rental.status === RentalStatus.REQUESTED && status === RentalStatus.REJECTED){
        rental.status = RentalStatus.REJECTED;
      } else {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Owner can only update REQUESTED rentals"
        );
      }
    }

    // --- Renter actions ---
    if (isRenter) {
      if (
        rental.status === RentalStatus.REQUESTED &&
        status === RentalStatus.CANCELLED
      ) {
        rental.status = RentalStatus.CANCELLED;
        item.availability = Availability.IN_STOCK;
      } else if (
        rental.status === RentalStatus.ONGOING &&
        status === RentalStatus.RETURNED
      ) {
        rental.status = RentalStatus.RETURNED;
        rental.returnDate = new Date();
        item.availability = Availability.IN_STOCK;
      } else {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Invalid renter status update"
        );
      }
    }

    await item.save({ session });
    await rental.save({ session });

    await session.commitTransaction();
    session.endSession();

    return rental;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const deleteRental = async (rentalId: string) => {
  const rental = await Rental.findById(rentalId);
  if (!rental) throw new AppError(httpStatus.NOT_FOUND, "Rental not found");

  const item = await Item.findById(rental.itemId);
  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Item not found");
  }

  item.availability = Availability.IN_STOCK;

  await Rental.findByIdAndDelete(rentalId);
  await item.save()
  return rental;
};

export const RentalServices = {
  createRental,
  allRentals,
  rentalInfoById,
  updateRentalStatus,
  deleteRental,
};
