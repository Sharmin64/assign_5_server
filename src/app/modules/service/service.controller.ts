import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { ServicingService } from "./service.service";
import serviceValidationSchema from "./service.validation";
import sendResponse from "../../utils/sendResponse";
import mongoose, { AnyObject } from "mongoose";
import { Service } from "./service.model";
import { Document } from "mongoose";
import { IService, TCustomResponse } from "./service.interface";

export type ServiceDocument = Document<unknown, {}, IService> &
  IService & { _id: unknown };
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
  const { name, price, duration, sortBy, limit = 10, page = 1 } = req.query;

  const filter: AnyObject = {};
  if (name) filter.name = { $regex: name, $options: "i" };
  if (price) filter.price = price;
  if (duration) filter.duration = duration;

  const sort: AnyObject = {};
  if (sortBy) sort[sortBy as string] = 1;

  const skip = (Number(page) - 1) * Number(limit);
  // const result = await ServicingService.getAllServicesFromDB
  const result = await Service.find(filter)
    .sort(sort)
    .limit(Number(limit))
    .skip(skip);
  const totalCount = await Service.countDocuments(filter);
  if (!result) {
    return next(new AppError(httpStatus.NOT_FOUND, "No Data Found"));
  }

  const response: TCustomResponse<ServiceDocument[]> = {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services retrieved successfully",
    data: result,
    pagination: {
      total: totalCount,
      limit: Number(limit),
      page: Number(page),
    },
  };

  sendResponse(res, response);
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
