import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RentalServices } from "./rental.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createRental = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const rent = await RentalServices.createRental(req.body, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Item rented request send successfully",
    data: rent,
  });
});

const allRentals = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const rentals = await RentalServices.allRentals(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Rentals retrive successfully",
    data: rentals,
  });
});

const rentalInfoById = catchAsync(async (req: Request, res: Response) => {
  const rental = await RentalServices.rentalInfoById(
    req.params.id,
    req.user.userId
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental details fetched successfully",
    data: rental,
  });
});

const updateRentalStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  const updatedRental = await RentalServices.updateRentalStatus(
    req.params.id,
    req.user.userId,
    status
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental status updated successfully",
    data: updatedRental,
  });
});


const deleteRental = catchAsync(async (req: Request, res: Response) => {
  const deletedRental = await RentalServices.deleteRental(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental deleted successfully",
    data: deletedRental,
  });
});



export const RentalController = {
  createRental,
  allRentals,
  rentalInfoById,
  updateRentalStatus,
  deleteRental
};
