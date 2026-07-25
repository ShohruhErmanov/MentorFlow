import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { mockUsers } from '../auth/mockUsers';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((username, password) => {
    const match = mockUsers.find(
      (u) => u.username === username && u.password === password,
    );
    if (!match) return null;

    const { password: _password, ...safeUser } = match;
    setUser(safeUser);
    return safeUser;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
