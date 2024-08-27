import { Schema, model } from "mongoose";
import { IService } from "./service.interface";

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export const Service = model<IService>("Service", serviceSchema);
