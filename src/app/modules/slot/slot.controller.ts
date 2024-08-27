/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import slotValidation from "./slot.validation";
import mongoose from "mongoose";
import {
  availableSlotsInDb,
  createSlotsInDb,
  existedServiceInDb,
} from "./slot.service";
import totalSlotCount from "./utils/totalSlot";
import { createSearchQuery } from "./utils/searchQuery";
import AppError from "../../errors/AppError";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

export const createSlots = catchAsync(async (req, res, next) => {
  const slotData = await req.body;
  const isValidData = await slotValidation.parseAsync(slotData);
  if (!isValidData) {
    return next(new AppError(httpStatus.BAD_REQUEST, "Zod validation error"));
  }

  const { service: serviceId, date, startTime, endTime } = isValidData;
  const isValidId = mongoose.Types.ObjectId.isValid(serviceId);

  if (!isValidId) {
    return next(new AppError(httpStatus.BAD_REQUEST, "Invalid Objectid"));
  }

  const isServiceExist = await existedServiceInDb(serviceId);
  if (!isServiceExist) {
    return next(new AppError(httpStatus.NOT_FOUND, " No data found"));
  }

  const serviceDuration = isServiceExist?.duration;

  const totalSlots: any = await totalSlotCount(
    serviceId,
    serviceDuration,
    date,
    startTime,
    endTime
  );

  if (!totalSlots) {
    return next(new AppError(httpStatus.BAD_GATEWAY, "Bad gateway"));
  }

  const result = await createSlotsInDb(totalSlots);
  if (!result) {
    return next(new AppError(httpStatus.NOT_FOUND, "No data Found"));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slots created successfully",
    data: result,
  });
});

export const availableSlots = catchAsync(async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const query = req.query;
  // console.log(query);

  const finalQuery = await createSearchQuery(serviceId, query);

  const result = await availableSlotsInDb(finalQuery);
  // console.log(result);

  if (!result) {
    return next(new AppError(httpStatus.NOT_FOUND, "No Data Found"));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "available slots retrieved successfully",
    data: result,
  });
});
