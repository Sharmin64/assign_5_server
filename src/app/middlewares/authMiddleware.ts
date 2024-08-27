/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import AppError from "../errors/AppError";

export const authMiddleware = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization as string | undefined;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next(
      new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route")
    );
  }

  const secretKey = config.jwt_access_secret;
  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(
      new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route")
    );
  }
  const decoded = jwt.verify(token, secretKey as string);
  (req as any).decoded = decoded;
  next();
});
