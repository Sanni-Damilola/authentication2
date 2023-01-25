import mongoose, { model } from "mongoose";
import { userData } from "../Interface/user.interface";

interface iuserData extends userData, mongoose.Document {}

const userSchema = new mongoose.Schema(
  {
    name: {
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
  },
  { timestamps: true }
);

const userModel = model<iuserData>("User", userSchema);

export default userModel;
