// import { PartialService } from "./service.interface";
import { AnyObject } from "mongoose";
import { Service } from "./service.model";
import { PartialService } from "./service.interface";

const createServiceInDB = async (data: AnyObject) => {
  const result = await Service.create({ ...data });
  return result;
};

const getServiceByIdFromDB = async (
  id: string
): Promise<PartialService | unknown> => {
  const result = await Service.findOne({ _id: id });
  return result;
};

const getAllServicesFromDB = async (): Promise<PartialService | unknown> => {
  const result = await Service.find();
  return result;
};

const updateServiceInDB = async (
  id: string,
  data: PartialService
): Promise<PartialService | unknown> => {
  let response: string | Array<PartialService> | unknown = "";

  const Id = { _id: id };
  const updatedData = { ...data };
  const options = { new: true };
  const result = await Service.findByIdAndUpdate(Id, updatedData, options);
  response = result;
  return response;
};
const deleteServiceFromDB = async (
  id: string
): Promise<PartialService | unknown> => {
  let response: string | Array<PartialService> | unknown = "";

  const Id = { _id: id };
  const updatedData = { isDeleted: true };
  const options = { new: true };
  const result = await Service.findByIdAndUpdate(Id, updatedData, options);
  response = result;
  return response;
};

export const ServicingService = {
  createServiceInDB,
  getServiceByIdFromDB,
  getAllServicesFromDB,
  updateServiceInDB,
  deleteServiceFromDB,
};
