/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

export const isUser = catchAsync(async (req, res, next) => {
  const userEmail = await (req as any)?.decoded?.email;

  const userExist: IUser | null = await User.findOne({ email: userEmail });

  // check if the user exist or not
  if (!userExist) {
    return next(new AppError(httpStatus.NOT_FOUND, "User Not Found"));
  }

  // check user role is admin or not
  if (userExist?.role !== "user") {
    return next(
      new AppError(httpStatus.UNAUTHORIZED, "Access denied , you not an user")
    );
  }
  (req as any).user = userExist;
  next();
});
