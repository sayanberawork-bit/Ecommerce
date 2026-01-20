import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'user' | 'support' | 'admin' | null;

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    role: UserRole;
  } | null;
}

interface AuthContextType extends AuthState {
  login: (name: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = (name: string, role: UserRole) => {
    setAuth({ isAuthenticated: true, user: { name, role } });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
