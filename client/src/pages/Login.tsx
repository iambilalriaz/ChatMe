import { KeyboardEvent, useState } from 'react';
import Input from '../components/Input';
import AuthLayout from '../layouts/AuthLayout';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/requests';
import { validate } from 'email-validator';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const onEnterPress = (e: KeyboardEvent) => {
    if (e?.key === 'Enter') {
      onLogin();
    }
  };

  const onLogin = () => {
    if (!validate(email)) {
      toast.error('Please enter valid email address.');
      return;
    }
    if (!password?.trim()) {
      toast.error('Please enter password.');
      return;
    }
    loginRequest(email, password)
      .then((response) => {
        const { data } = response;
        localStorage.setItem('appUser', JSON.stringify(data));
        navigate('/home');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <AuthLayout heading='login'>
      <Input
        label='Email'
        value={email}
        setValue={setEmail}
        onEnterPress={onEnterPress}
      />
      <Input
        label='Password'
        type='password'
        value={password}
        setValue={setPassword}
        onEnterPress={onEnterPress}
      />
      <p className='text-sm text-right'>
        Not a user?{' '}
        <Link to='/signup' className='text-primary underline'>
          Creat account
        </Link>
      </p>
      <div className='flex justify-center items-center mt-3'>
        <Button label='Login' onClick={onLogin} />
      </div>
    </AuthLayout>
  );
};

export default Login;
