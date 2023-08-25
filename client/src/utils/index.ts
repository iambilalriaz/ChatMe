import { AxiosError } from 'axios';
import { IUser } from '../types';

export const getAppUser = () =>
  JSON.parse(localStorage.getItem('appUser') as string) as {
    user: IUser;
    token: string;
  };

export const getAPIError = (error: unknown) => {
  const errorMessage = error as AxiosError<{ message: string }>;
  return errorMessage.response?.data.message || 'Something went wrong.';
};

export const getQueryParameter = (query: string) => {
  const params = new URLSearchParams(location.search);
  return params.get(query);
};
