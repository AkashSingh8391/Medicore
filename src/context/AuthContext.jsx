import { createContext, useEffect, useMemo, useState, useCallback } from 'react';
import { authService } from '../services/api/authService';
import { getAccessToken, getRefreshToken, getStoredUser, setStoredUser, setTokens, clearTokens } from '../utils/tokenStorage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [isInitializing, setIsInitializing] = useState(true);

  // On first mount, trust whatever was persisted locally. Once the real
  // backend exists, this is where a GET /auth/me call would validate
  // the token and refresh the user profile.
  useEffect(() => {
    setIsInitializing(false);
  }, []);

  const login = useCallback(async ({ email, password, rememberMe }) => {
    const { user: loggedInUser, accessToken, refreshToken } = await authService.login({ email, password });
    setTokens({ accessToken, refreshToken });
    setStoredUser(loggedInUser);
    setUser(loggedInUser);
    // "Remember me" here just controls whether we'd persist beyond the
    // session in a real cookie-based setup; localStorage already persists.
    return loggedInUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout(getRefreshToken());
    } finally {
      clearTokens();
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      role: user?.role ?? null,
      isAuthenticated: Boolean(user && getAccessToken()),
      isInitializing,
      login,
      logout,
    }),
    [user, isInitializing, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
