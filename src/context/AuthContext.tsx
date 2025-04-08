
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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

// Mock user database with persistent hardcoded users
const defaultUsers = [
  { email: 'admin@gmail.com', password: 'admin123', userType: 'admin' as UserType },
  { email: 'user@123', password: 'user123', userType: 'customer' as UserType },
  { email: 'user@example.com', password: 'password', userType: 'customer' as UserType },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [users, setUsers] = useState(() => {
    // Get stored users from localStorage or use default users
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : defaultUsers;
  });
  
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = (email: string, password: string): boolean => {
    console.log("Login attempt:", email, password);
    
    // Find user with case-insensitive email comparison
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    console.log("Found user:", foundUser);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
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
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      toast({
        title: 'Registration failed',
        description: 'This email is already registered.',
        variant: 'destructive',
      });
      return false;
    }

    // Always register as customer
    const newUser = { email, password, userType: "customer" };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
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
