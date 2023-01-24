import mongoose, { model } from "mongoose";

interface userData {
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  stack: string;
}

interface iuserData extends userData, mongoose.Document {}

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "please enter your full Name"],
    },
    email: {
      type: String,
      required: [true, "please enter your full Email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please, enter a password"],
      minlength: 6,
    },
    stack: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userModel = model<iuserData>("User", userSchema);

export default userModel;
