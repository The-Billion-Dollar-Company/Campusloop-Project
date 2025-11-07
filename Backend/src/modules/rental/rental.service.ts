import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { IRental } from "./rental.interface";
import httpStatus from "http-status-codes";
import { Rental } from "./rental.model";
import { Item } from "../item/item.model";

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

const allRentals = async () => {};

const rentalInfoById = async () => {};

export const RentalServices = {
  createRental,
  allRentals,
  rentalInfoById,
};
