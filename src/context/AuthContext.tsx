
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types/user';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  isAdmin: boolean;
}

// Create the Auth Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  getToken: () => null,
  updateProfile: async () => {},
  isAdmin: false
});

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        const userProfile = JSON.parse(storedUser) as UserProfile;
        setUser(userProfile);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, check hardcoded credentials
      if (email === 'admin@example.com' && password === 'admin123') {
        const userProfile: UserProfile = {
          email,
          userType: 'admin',
          displayName: 'Admin User',
          phoneNumber: '+1234567890'
        };
        
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(userProfile));
        localStorage.setItem('token', 'demo-token-for-admin');
        setUser(userProfile);
        
      } else if (email === 'user@example.com' && password === 'user123') {
        const userProfile: UserProfile = {
          email,
          userType: 'customer',
          displayName: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '+9876543210'
        };
        
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(userProfile));
        localStorage.setItem('token', 'demo-token-for-customer');
        setUser(userProfile);
        
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user profile
      const userProfile: UserProfile = {
        email,
        userType: 'customer',
        displayName: email.split('@')[0],
        firstName: email.split('@')[0],
        lastName: ''
      };
      
      // Store user data and token
      localStorage.setItem('user', JSON.stringify(userProfile));
      localStorage.setItem('token', `demo-token-for-${email}`);
      setUser(userProfile);
      
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };
  
  const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get existing user data
      const existingUser = user || JSON.parse(localStorage.getItem('user') || '{}');
      
      // Update user profile with new data
      const updatedProfile: UserProfile = {
        ...existingUser,
        ...profileData
      };
      
      // Store updated user data
      localStorage.setItem('user', JSON.stringify(updatedProfile));
      setUser(updatedProfile);
      
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const isAdmin = user?.userType === 'admin';
  const isAuthenticated = !!user;
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading, 
      login, 
      register, 
      logout, 
      getToken,
      updateProfile,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);
