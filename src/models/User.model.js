import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    profilePic: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 5,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minLength: 8,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
