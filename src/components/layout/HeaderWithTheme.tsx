
import React from 'react';
import Header from '@/components/layout/Header';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function HeaderWithTheme() {
  return (
    <div className="flex items-center justify-between w-full">
      <Header />
      <div className="flex items-center mr-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
