import express from "express";
import { availableSlots, createSlots } from "./slot.controller";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { isAdmin } from "../../middlewares/isAdmin";
const router = express.Router();

router.post("/services/slots", authMiddleware, isAdmin, createSlots);

router.get("/slots/availability/:serviceId?", availableSlots);

export const SlotRoute = router;
