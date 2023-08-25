import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SignUpState {
  user: {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  };
  otp: string;
}

const initialState: SignUpState = {
  user: {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  },
  otp: '',
};

export const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setEmail: (state = initialState, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    setName: (state = initialState, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    setPassword: (state = initialState, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
    setConfirmPassword: (
      state = initialState,
      action: PayloadAction<string>
    ) => {
      state.user.confirmPassword = action.payload;
    },
    clearSignupForm: (state = initialState) => {
      state.user = initialState.user;
    },
    setOTP: (state = initialState, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
  },
});

export const {
  setEmail,
  setName,
  setPassword,
  setConfirmPassword,
  setOTP,
  clearSignupForm,
} = signUpSlice.actions;

export default signUpSlice.reducer;
