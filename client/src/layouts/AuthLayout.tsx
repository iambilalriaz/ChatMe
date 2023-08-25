import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppUser } from '../utils';

const AuthLayout = ({
  heading,
  children,
}: {
  heading: string;
  children: JSX.Element | JSX.Element[];
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (getAppUser()) {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className='w-screen h-screen bg-primary grid place-items-center'>
      <section className='bg-light p-6 rounded-md shadow-lg w-[80%] md:w-[50%]'>
        <h1 className='capitalize text-2xl font-semibold text-center mb-4'>
          {heading}
        </h1>
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
