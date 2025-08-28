'use client';
import { AppStoreProvider } from '@/store';
import { ThemeProvider } from '@/theme';
import React, { useEffect, useState } from 'react';

interface ClientProvidersProps {
  children: React.ReactNode;
  initialIsMobile: boolean;
  onIsMobileChange?(isMobile: boolean): void;
}

export const ClientProviders: React.FC<ClientProvidersProps> = ({ children, initialIsMobile, onIsMobileChange }) => {
  const [isMobile, setIsMobile] = useState(initialIsMobile);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const handler = () => {
      setIsMobile(mq.matches);
      onIsMobileChange?.(mq.matches);
    };
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [onIsMobileChange]);

  // Optionally expose via context if needed later.
  return (
    <AppStoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppStoreProvider>
  );
};
