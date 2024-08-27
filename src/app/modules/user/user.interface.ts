import { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

export interface UserModel extends Model<IUser> {
  comparePassword(plainPassword: string, hashedPassword: string): boolean;
}

export interface DecodedToken {
  user: string;
  iat: number;
  exp: number;
}
export type PartialUser = Partial<IUser>;
