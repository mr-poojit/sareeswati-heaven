
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// This is a simplified mock auth implementation
// In a real app, you'd integrate with a backend service
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check for saved user on startup
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll just simulate a successful login
    // with a mock user account
    if (email && password) {
      const newUser = { 
        id: 'user123', 
        name: email.split('@')[0], 
        email 
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return Promise.resolve();
    }
    
    return Promise.reject('Invalid credentials');
  };

  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll just simulate a successful registration
    if (name && email && password) {
      const newUser = { id: 'user123', name, email };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return Promise.resolve();
    }
    
    return Promise.reject('Invalid registration data');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
