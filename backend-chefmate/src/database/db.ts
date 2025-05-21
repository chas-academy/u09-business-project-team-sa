import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI_LOCAL ?? process.env.MONGO_URI_PROD ?? "";

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env file");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log(`MongoDB Connected ${MONGO_URI}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};