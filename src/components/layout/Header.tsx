
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center">
      <Link to="/" className="text-xl font-bold text-primary">Cloud Jet Airways</Link>
    </div>
  );
}

// Export as default for backward compatibility
export default Header;
