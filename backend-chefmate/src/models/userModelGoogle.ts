import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  googleId: String,
  provider: { type: String, default: "google" },
});

export const GoogleUser = mongoose.model("GoogleUser", userSchema);
