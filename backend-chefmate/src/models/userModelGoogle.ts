import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  
});

export const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);
