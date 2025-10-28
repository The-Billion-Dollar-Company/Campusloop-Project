import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { Status } from "../modules/user/user.interface";

export const checkAuth =
  (...authRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization || req.cookies.accessToken;

      if (!accessToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, "No Token Recieved");
      }
      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExists = await User.findOne({ email: verifiedToken.email });

      if (!isUserExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exists");
      }

      if (
        isUserExists.isStatus === Status.PENDING ||
        isUserExists.isStatus === Status.SUSPEND
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "User status is pending or suspend"
        );
      }

      if (!authRole.includes(verifiedToken.activeRole)) {
        throw new AppError(403, "You are not permitted to view these data");
      }
      req.user = verifiedToken;

      next();
    } catch (error) {
      next(error);
    }
  };
