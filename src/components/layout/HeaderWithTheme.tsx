
import React from 'react';
import { Header } from '@/components/layout/Header';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/context/AuthContext';

export function HeaderWithTheme() {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center justify-between w-full">
      <Header />
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default HeaderWithTheme;
