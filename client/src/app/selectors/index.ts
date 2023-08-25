import { RootState } from '../store';

export const selectSignUpForm = (state: RootState) => state.signup.user;
export const selectOTPCode = (state: RootState) => state.signup.otp;
