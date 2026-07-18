import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLE_HOME_ROUTE } from '../constants/roles';

/**
 * Guards a route subtree to a set of allowed roles.
 * Usage: <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN]} />}>...</Route>
 */
export function RoleBasedRoute({ allowedRoles }) {
  const { role } = useAuth();

  if (!role) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(role)) {
    // Logged in, but wrong role for this subtree — send to their own home.
    return <Navigate to={ROLE_HOME_ROUTE[role] ?? '/login'} replace />;
  }

  return <Outlet />;
}
