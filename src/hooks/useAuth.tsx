
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
    console.log('AuthProvider: Checking for existing session');
    // Check for existing session
    const savedUser = localStorage.getItem('edatlas_user');
    if (savedUser) {
      console.log('AuthProvider: Found saved user', JSON.parse(savedUser));
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
    console.log('AuthProvider: Initialization complete');
  }, []);

  const login = async (email: string) => {
    console.log('AuthProvider: Starting login for email:', email);
    setIsLoading(true);
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('AuthProvider: Setting pending email:', email);
    setPendingEmail(email);
    toast({
      title: "Verification Code Sent",
      description: `Check your email at ${email} for the 6-digit code.`,
    });
    console.log('AuthProvider: Login process complete, toast shown');
    setIsLoading(false);
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    console.log('AuthProvider: Verifying 2FA code:', code, 'for email:', pendingEmail);
    if (!pendingEmail) {
      console.log('AuthProvider: No pending email found');
      return false;
    }
    
    setIsLoading(true);
    // Mock verification - in real app, this would verify with backend
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (code === '123456') { // Mock successful verification
      console.log('AuthProvider: 2FA verification successful');
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
    
    console.log('AuthProvider: 2FA verification failed');
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    console.log('AuthProvider: Logging out user');
    setUser(null);
    localStorage.removeItem('edatlas_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  // Debug logging for state changes
  useEffect(() => {
    console.log('AuthProvider state changed:', { user: !!user, isLoading, pendingEmail });
  }, [user, isLoading, pendingEmail]);

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
