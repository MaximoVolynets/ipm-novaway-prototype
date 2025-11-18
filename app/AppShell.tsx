// app/AppShell.tsx
'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

interface AppShellProps {
  children: ReactNode;
}

const INIT_KEY = 'novawayInitialized_v1';

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  // Runs once per browser the first time the app loads
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const initialized = window.localStorage.getItem(INIT_KEY);

      if (!initialized) {
        // only clean NovaWay-related keys
        window.localStorage.removeItem('novawayUser');

        window.localStorage.setItem(INIT_KEY, 'true');
      }
    } catch (err) {
      console.error('Error during first-run localStorage cleanup', err);
    }
  }, []);

  const showBottomNav = pathname !== '/login';

  return (
    <div className="flex min-h-screen max-w-md flex-col bg-white shadow-lg sm:mx-auto">
      <Header />
      <main className="flex-1 overflow-y-auto">{children}</main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}