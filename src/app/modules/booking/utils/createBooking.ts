import { AnyObject } from "mongoose";
import { Slot } from "../../slot/slot.model";
import AppError from "../../../errors/AppError";
import httpStatus from "http-status";

const createBookingData = async (rawData: AnyObject, userId: string) => {
  const {
    serviceId,
    slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = rawData;

  const slot = await Slot.findById(slotId);
  if (!slot || slot.isBooked === "booked") {
    throw new AppError(httpStatus.CONFLICT, "slot is already booked");
  }

  const bookingData: AnyObject = {
    customer: userId,
    service: serviceId,
    slot: slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  };

  return bookingData;
};

export default createBookingData;
