import { getAppUser } from '../utils';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }: { children: JSX.Element }) =>
  getAppUser() ? children : <Navigate to='/login' />;

export default Protected;
