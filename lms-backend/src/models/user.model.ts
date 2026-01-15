import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["STUDENT", "INSTRUCTOR", "ADMIN"],
      default: "STUDENT"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);

export default User;
/*


export interface User {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
}

export interface UserDocument extends User {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
}
*/