import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { ServicingService } from "./service.service";
import serviceValidationSchema from "./service.validation";
import sendResponse from "../../utils/sendResponse";
import mongoose from "mongoose";

const createService = catchAsync(async (req, res, next) => {
  const serviceRawData = await req.body;
  const validateData = await serviceValidationSchema.parseAsync(serviceRawData);
  const result = await ServicingService.createServiceInDB(validateData);
  if (!result) {
    return next(
      new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "service creation unsuccessful"
      )
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service created Successfully",
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res, next) => {
  const serviceId = req.params.id;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(serviceId);
  if (isValidObjectId) {
    return next(new AppError(httpStatus.BAD_REQUEST, "Invalid ObjectId"));
  }

  const result = await ServicingService.getServiceByIdFromDB(serviceId);
  if (!result) {
    return next(new AppError(httpStatus.NOT_FOUND, "No Data Found"));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});
const getAllServices = catchAsync(async (req, res, next) => {
  const result = await ServicingService.getAllServicesFromDB();
  if (!result) {
    return next(new AppError(httpStatus.NOT_FOUND, "No Data Found"));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services retrieved successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req, res, next) => {
  const serviceId = req.params.id;
  const data = req.body;
  const isValidObjectId = mongoose.Types.ObjectId.isValid(serviceId);
  if (!isValidObjectId) {
    return next(new AppError(httpStatus.BAD_REQUEST, "Invalid Objectid"));
  }

  const result = await ServicingService.updateServiceInDB(serviceId, data);
  if (!result) {
    return next(new AppError(httpStatus.NOT_FOUND, "No data found"));
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req, res, next) => {
  const serviceId = req.params.id;
  const isValidObjectId = mongoose.Types.ObjectId.isValid(serviceId);
  if (!isValidObjectId) {
    return next(new AppError(httpStatus.BAD_REQUEST, "Invalid Objectid"));
  }

  const result = await ServicingService.deleteServiceFromDB(serviceId);
  if (!result) {
    return next(new AppError(httpStatus.NOT_FOUND, "No data Found"));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: result,
  });
});

export const ServiceControllers = {
  createService,
  getSingleService,
  getAllServices,
  updateService,
  deleteService,
};
