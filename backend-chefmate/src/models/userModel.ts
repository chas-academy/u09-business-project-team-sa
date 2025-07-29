import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  // password: { type: String, default: "" }, // make optional for Google users
  password: { type: String, required: false },
  picture: { type: String }, // optional, Google profile picture
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
