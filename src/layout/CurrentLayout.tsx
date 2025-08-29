import React from 'react';
import PrivateLayout from './PrivateLayout';
import PublicLayout from './PublicLayout';

import { getSessionUser } from '@/actions/authActions';

const SESSION_COOKIE = 'app_session';

/**
 * Checks if user is authenticated on the server
 * @returns true if user is authenticated, false otherwise
 */
async function isAuthenticatedServer(): Promise<boolean> {
  const sessionUser = await getSessionUser();
  return !!sessionUser;
}

export interface LayoutProps {
  children: React.ReactNode;
}

const CurrentLayout = async ({ children }: LayoutProps) => {
  const authed = await isAuthenticatedServer();

  return authed ? <PrivateLayout>{children}</PrivateLayout> : <PublicLayout>{children}</PublicLayout>;
};

export default CurrentLayout;
