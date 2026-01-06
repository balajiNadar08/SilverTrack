import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    minLength: 2,
    maxLength: 255,
    match: [/\S+@\S+\.\S+/, "Please fill a valid email"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 6,
  },

  avatar: {
    type: String,
    enum: [
      "avatar1.webp",
      "avatar2.webp",
      "avatar3.webp",
      "avatar4.webp",
      "avatar5.webp",
      "avatar6.webp",
    ],
    default: "avatar1.webp",
  },

  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "dark",
  },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
