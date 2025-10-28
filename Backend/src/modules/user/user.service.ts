import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";

const getMe = async (email: string) => {
  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exits");
  }
    return user
};

export const UserServices = {
  getMe
};
