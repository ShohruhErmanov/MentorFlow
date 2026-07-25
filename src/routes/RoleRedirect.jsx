import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getDefaultPathForRole } from './roleRoutes';

export default function RoleRedirect() {
  const { user } = useAuth();
  const target = user ? getDefaultPathForRole(user.role) : '/login';
  return <Navigate to={target} replace />;
}
