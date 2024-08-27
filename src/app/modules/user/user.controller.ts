// /* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { AnyObject } from "mongoose";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";

const userSignup = catchAsync(async (req, res, next) => {
  const result = await UserServices.signupUserInDB(req.body);
  if (!result) {
    return next(
      new AppError(httpStatus.BAD_REQUEST, "data creation unsuccessful")
    );
  }

  res.status(201).json({
    status: "true",
    statusCode: 200,
    message: "user resistered successfully",
    data: result,
  });
});
const userLogin = catchAsync(async (req, res, next) => {
  // req.body coming properly. {email, password}
  const rawData = await req?.body;
  const { email, password } = rawData;

  const user: AnyObject | null = await UserServices.findUserByEmail(email);
  if (!user) {
    return next(new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials"));
  }

  const verifyPassword = await UserServices.passwordCompare(
    password,
    user.password
  );
  if (!verifyPassword) {
    return next(new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials"));
  }

  const jwtToken = await UserServices.tokenProvider(rawData);
  if (!jwtToken) {
    return next(new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials"));
  }
  // const stringToken = JSON.stringify(jwtToken);
  res.set("Authorization", `Bearer ${jwtToken}`);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    token: jwtToken,
    data: user,
  });
});

export const UserController = {
  userSignup,
  userLogin,
};
