
import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <div className="flex items-center">
      <Link to="/" className="text-xl font-bold text-primary">Cloud Jet Airways</Link>
    </div>
  );
}

// Export as default for backward compatibility
export default Header;
