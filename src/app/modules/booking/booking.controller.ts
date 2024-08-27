import { AnyObject } from "mongoose";
import { PartialBookings } from "./booking.interface";
import { BookingServices } from "./booking.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import createBookingData from "./utils/createBooking";
import AppError from "../../errors/AppError";
import sendResponse from "../../utils/sendResponse";

const createBookings = catchAsync(async (req, res, next) => {
  const rawData: AnyObject = await req.body;
  const userId = (req as AnyObject)?.user?.id;
  const bookingData: PartialBookings = await createBookingData(rawData, userId);

  const result = await BookingServices.createBookingInDB(bookingData);
  if (!result) {
    return next(
      new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Booking creation unsuccessful"
      )
    );
  }
  const getBooking = await BookingServices.getBookingFromDB();
  if (!getBooking) {
    return next(new AppError(httpStatus.NOT_FOUND, "No Data Found"));
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res, next) => {
  const result = await BookingServices.getAllBookingsFromDB();
  if (!result) {
    return next(new AppError(httpStatus.NOT_FOUND, "No Data Found"));
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req, res, next) => {
  const userId: string = (req as AnyObject)?.user?.id;
  const result = await BookingServices.getMyBookingFromDB(userId);
  if (!result) {
    return next(new AppError(httpStatus.NOT_FOUND, "No Data Found"));
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const BookingsControllers = {
  createBookings,
  getAllBookings,
  getMyBookings,
};
