import { Date, Document, Schema } from "mongoose";

interface TSlot extends Document {
  service: Schema.Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked?: "available" | "booked" | "canceled";
}

export type PartialSlot = Partial<TSlot>;
export default TSlot;
