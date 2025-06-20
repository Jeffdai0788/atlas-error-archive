
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('edatlas_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setPendingEmail(email);
    toast({
      title: "Verification Code Sent",
      description: `Check your email at ${email} for the 6-digit code.`,
    });
    setIsLoading(false);
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    if (!pendingEmail) return false;
    
    setIsLoading(true);
    // Mock verification - in real app, this would verify with backend
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (code === '123456') { // Mock successful verification
      const newUser: User = {
        id: Date.now().toString(),
        email: pendingEmail,
        name: pendingEmail.split('@')[0],
      };
      setUser(newUser);
      localStorage.setItem('edatlas_user', JSON.stringify(newUser));
      setPendingEmail(null);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edatlas_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, verify2FA }}>
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
