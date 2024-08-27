import { AnyObject } from "mongoose";

import { PartialSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import { Service } from "../service/service.model";

export const existedServiceInDb = async (serviceId: string) => {
  const isServiceExist = await Service.findOne({ _id: serviceId });
  return isServiceExist;
};

export const createSlotsInDb = async (totalSlots: Array<PartialSlot>) => {
  const result = await Slot.create(totalSlots);
  return result;
};

export const availableSlotsInDb = async (query: AnyObject) => {
  const result = await Slot.find(query);
  return result;
};
