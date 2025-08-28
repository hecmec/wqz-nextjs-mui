import React from 'react';
import PrivateLayout from './PrivateLayout';
import PublicLayout from './PublicLayout';

// If auth must be resolved client-side, always render both skeletons or a loading shell.
// For demo we assume a server helper can tell us:
import { headers } from 'next/headers';

async function isAuthenticatedServer(): Promise<boolean> {
  // Example: check cookie
  const cookie = (await headers()).get('cookie') || '';
  return /session=/.test(cookie);
}

export interface LayoutProps {
  children: React.ReactNode;
}

const CurrentLayout = async ({ children }: LayoutProps) => {
  const authed = await isAuthenticatedServer();
  return authed ? <PrivateLayout>{children}</PrivateLayout> : <PublicLayout>{children}</PublicLayout>;
};

export default CurrentLayout;
