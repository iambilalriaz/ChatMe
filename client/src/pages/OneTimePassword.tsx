import { KeyboardEvent, useState } from 'react';
import Input from '../components/Input';
import AuthLayout from '../layouts/AuthLayout';
import Button from '../components/Button';
import { toast } from 'react-toastify';
import { signupRequest, verifyOTPRequest } from '../api/requests';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSignUpForm } from '../app/selectors';
import { clearSignupForm } from '../app/slices/signupSlice';
import { useNavigate } from 'react-router-dom';

const OneTimePassword = () => {
  const [code, setCode] = useState('');
  const { email, name, password } = useAppSelector(selectSignUpForm);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onEnterPress = (e: KeyboardEvent) => {
    if (e?.key === 'Enter') {
      onVerify();
    }
  };

  const onVerify = () => {
    if (code?.trim()?.length < 4) {
      toast.error('Invalid OTP.');
      return;
    }
    verifyOTPRequest(code, email)
      .then((response) => {
        signupRequest(name, email, password).then(() => {
          toast.success(response.data.message);
          dispatch(clearSignupForm());
          navigate('/login');
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <AuthLayout heading='Verify OTP'>
      <Input
        label=''
        value={code}
        setValue={setCode}
        onEnterPress={onEnterPress}
      />

      <div className='flex justify-center items-center mt-3'>
        <Button label='Verify' onClick={onVerify} />
      </div>
    </AuthLayout>
  );
};

export default OneTimePassword;
