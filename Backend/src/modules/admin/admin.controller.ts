import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";
import httpStatus from "http-status-codes";


const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const {status} = req.body;

  const updatedUserStatus = await AdminServices.updateUserStatus(userId, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User status updated successfully",
    data: updatedUserStatus,
  });
});


const allItems = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const items = await AdminServices.allItems(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Items retrieve successfully",
    data: items.data,
    meta: items.meta,
  });
});


const allUsers = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const users = await AdminServices.allUsers(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Users retrieve successfully",
    data: users.data,
    meta: users.meta,
  });
});

export const AdminController = {
  updateUserStatus,
  allItems,
  allUsers
};
