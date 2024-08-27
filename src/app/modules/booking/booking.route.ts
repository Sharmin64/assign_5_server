import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { isUser } from "../../middlewares/isUser";
import { BookingsControllers } from "./booking.controller";

const router = express.Router();

router.post("/", authMiddleware, isUser, BookingsControllers.createBookings);
router.get("/", BookingsControllers.getAllBookings);
router.get(
  "/my-bookings",
  authMiddleware,
  isUser,
  BookingsControllers.getMyBookings
);

export const BookingRoute = router;
