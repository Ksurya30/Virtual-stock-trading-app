import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  balance: {
    type: Number,
    default: 100000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);