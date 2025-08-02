// models/User.js
import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
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
    select: false // Don't return password in queries
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  is_admin: {
    type: Boolean,
    default: false // Optional: set default to false
  }
});

const User = model('User', userSchema);

export default User;
