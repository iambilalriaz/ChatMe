import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profile_image: String,
  },
  {
    timestamps: true,
  }
);

export const User = model('users', userSchema);
