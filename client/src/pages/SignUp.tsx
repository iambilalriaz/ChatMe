/* eslint-disable react-hooks/exhaustive-deps */
import { KeyboardEvent, useCallback } from 'react';
import Input from '../components/Input';
import AuthLayout from '../layouts/AuthLayout';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from 'email-validator';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSignUpForm } from '../app/selectors';
import {
  setConfirmPassword,
  setEmail,
  setName,
  setPassword,
} from '../app/slices/signupSlice';
import { sendOTPRequest } from '../api/requests';
import { AxiosError } from 'axios';

const SignUp = () => {
  const { email, name, password, confirmPassword } =
    useAppSelector(selectSignUpForm);

  const dispatch = useAppDispatch();

  const setUserEmail = useCallback(
    (value: string) => dispatch(setEmail(value)),
    []
  );
  const setUserName = useCallback(
    (value: string) => dispatch(setName(value)),
    []
  );
  const setUserPassword = useCallback(
    (value: string) => dispatch(setPassword(value)),
    []
  );
  const setUserConfirmPassword = useCallback(
    (value: string) => dispatch(setConfirmPassword(value)),
    []
  );

  const navigate = useNavigate();

  const onEnterPress = (e: KeyboardEvent) => {
    if (e?.key === 'Enter') {
      onSignup();
    }
  };

  const onSignup = async () => {
    if (!validate(email)) {
      toast.error('Please enter valid email address.');
      return;
    }
    if (!name?.trim()) {
      toast.error('Name should not be empty.');
      return;
    }
    if (password?.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    sendOTPRequest(email)
      .then((response) => {
        toast.success(response.data.message);
        navigate('/otp');
      })
      .catch((error: AxiosError<{ message: string }>) => {
        toast.error(error?.response?.data.message);
      });
  };

  return (
    <AuthLayout heading='sign up'>
      <Input
        label='Email'
        value={email}
        setValue={setUserEmail}
        onEnterPress={onEnterPress}
      />
      <Input
        label='Name'
        value={name}
        setValue={setUserName}
        onEnterPress={onEnterPress}
      />
      <Input
        label='Password'
        type='password'
        value={password}
        setValue={setUserPassword}
        onEnterPress={onEnterPress}
      />
      <Input
        label='Confirm Password'
        type='password'
        value={confirmPassword}
        setValue={setUserConfirmPassword}
        onEnterPress={onEnterPress}
      />
      <p className='text-sm text-right'>
        Already a user?{' '}
        <Link to='/login' className='text-primary underline'>
          Login instead
        </Link>
      </p>
      <div className='flex justify-center items-center mt-3'>
        <Button label='Sign Up' onClick={onSignup} />
      </div>
    </AuthLayout>
  );
};

export default SignUp;
