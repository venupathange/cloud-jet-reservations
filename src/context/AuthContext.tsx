
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

type UserType = 'admin' | 'customer' | null;

interface User {
  email: string;
  userType: UserType;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, userType: UserType) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user database
const users = [
  { email: 'admin@gmail.com', password: 'admin123', userType: 'admin' as UserType },
  { email: 'user@123', password: 'user123', userType: 'customer' as UserType },
  // Add a test user that's easier to remember
  { email: 'user@example.com', password: 'password', userType: 'customer' as UserType },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email: string, password: string): boolean => {
    console.log("Login attempt:", email, password);
    console.log("Available users:", users);
    
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    console.log("Found user:", foundUser);

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast({
        title: 'Login successful',
        description: `Welcome back, ${email}!`,
      });
      return true;
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const register = (email: string, password: string, userType: UserType): boolean => {
    const existingUser = users.find((u) => u.email === email);
    
    if (existingUser) {
      toast({
        title: 'Registration failed',
        description: 'This email is already registered.',
        variant: 'destructive',
      });
      return false;
    }

    // In a real application, we would save this to a database
    // Now always register as customer regardless of what's passed
    users.push({ email, password, userType: "customer" });
    
    toast({
      title: 'Registration successful',
      description: 'You can now log in with your credentials.',
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
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
