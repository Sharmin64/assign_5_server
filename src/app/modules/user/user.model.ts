import { Schema, model } from "mongoose";

import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema: Schema<IUser, UserModel> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be required"],
    },
    email: {
      type: String,
      required: [true, "Email must be required and unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password must be required"],
    },
    phone: {
      type: String,
      required: [true, "Phone must be required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: [true, "Role must be required"],
      default: "user",
    },
    address: {
      type: String,
      required: [true, "Address must be required"],
    },
  },
  {
    timestamps: true,
  }
);

// user mongoose middleware
userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// user mongoose methods
userSchema.static(
  "comparePassword",
  function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
);

// Create and export the Mongoose model
export const User = model<IUser, UserModel>("User", userSchema);
