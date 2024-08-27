import { Booking } from "./booking.model";

import { PartialBookings } from "./booking.interface";

const createBookingInDB = async (bookingData: PartialBookings) => {
  const result = await Booking.create({ ...bookingData });
  return result;
};
const getBookingFromDB = async () => {
  const result = await Booking.find()
    .populate("user")
    .populate("service")
    .populate("slot");
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate("user")
    .populate("service")
    .populate("slot");
  return result;
};
const getMyBookingFromDB = async (userId: string) => {
  const result = await Booking.findById({ _id: userId })
    .populate("user")
    .populate("service")
    .populate("slot");
  return result;
};

export const BookingServices = {
  createBookingInDB,
  getBookingFromDB,
  getAllBookingsFromDB,
  getMyBookingFromDB,
};
