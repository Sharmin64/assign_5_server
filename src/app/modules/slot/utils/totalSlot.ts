/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from "mongoose";
import { PartialSlot } from "../slot.interface";

const totalSlotCount = async (
  serviceId: Schema.Types.ObjectId | undefined | string | any,
  serviceDuration: number,
  date: any,
  startTime: string,
  endTime: string
) => {
  const slots: Array<PartialSlot> = [];

  let timeStart: any = String(startTime);
  timeStart = timeStart.split(":");
  timeStart = Number(timeStart[0]);

  let timeEnd: any = String(endTime);
  timeEnd = timeEnd.split(":");
  timeEnd = Number(timeEnd[0]);

  const numberOfSlots: number = Math.abs(
    ((timeStart - timeEnd) * 60) / serviceDuration
  );

  for (let i = 0; i < numberOfSlots; i++) {
    const elem: number = Number(i);
    const data: PartialSlot = {
      service: serviceId,
      date,
      startTime: `${timeStart + elem}:00`,
      endTime: `${timeStart + elem + 1}:00`,
    };
    slots.push(data);
  }

  return slots;
};
export default totalSlotCount;
