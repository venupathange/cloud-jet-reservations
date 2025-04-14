
// JWT utility functions
interface JwtPayload {
  email: string;
  userType: 'admin' | 'customer' | null;
  exp: number;
}

// Generate a JWT token with 24 hour expiration
export const generateToken = (email: string, userType: 'admin' | 'customer' | null): string => {
  // In a real app, we would use a library like jsonwebtoken
  // For now, we'll create a simple implementation
  const payload: JwtPayload = {
    email,
    userType,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  };
  
  return btoa(JSON.stringify(payload));
};

// Validate a JWT token
export const validateToken = (token: string): JwtPayload | null => {
  try {
    const payload = JSON.parse(atob(token)) as JwtPayload;
    
    // Check if token is expired
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
