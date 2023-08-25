import { Schema, model } from 'mongoose';

const OTPSchema = new Schema({
  email: String,
  otp: String,
});
export const OTP = model('otp', OTPSchema);
