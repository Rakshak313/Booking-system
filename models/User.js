import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "expert"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// prevent model overwrite error in dev (VERY IMPORTANT)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;