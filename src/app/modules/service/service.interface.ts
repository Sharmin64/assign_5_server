import mongoose, { Document } from "mongoose";

export interface IService extends Document {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
}

export interface Pagination {
  total: number;
  limit: number;
  page: number;
}
export interface TCustomResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  pagination?: Pagination;
}

export type PartialService = Partial<IService>;
