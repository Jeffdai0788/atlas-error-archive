
import React, { createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  verify2FA: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock logged in user
  const user: User = {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
  };

  const login = async (email: string) => {
    // Mock login - does nothing
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    // Mock verification - always returns true
    return true;
  };

  const logout = () => {
    // Mock logout - does nothing for now
  };

  return (
    <AuthContext.Provider value={{ user, isLoading: false, login, logout, verify2FA }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
