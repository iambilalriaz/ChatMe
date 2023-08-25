import { RouteObject } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import OneTimePassword from '../pages/OneTimePassword';
import Protected from './Protected';
import Home from '../pages/Home';
import Messages from '../pages/Messages';
import Contacts from '../pages/Contacts';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/otp',
    element: <OneTimePassword />,
  },
  {
    path: '/home',
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/messages',
    element: (
      <Protected>
        <Messages />
      </Protected>
    ),
  },
  {
    path: '/contacts',
    element: (
      <Protected>
        <Contacts />
      </Protected>
    ),
  },
];
