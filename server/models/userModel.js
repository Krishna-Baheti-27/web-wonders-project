// models/User.js
import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    // select: false // Don't return password in queries
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = model('User', userSchema);

export default User;
