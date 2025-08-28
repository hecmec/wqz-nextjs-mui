import { IS_DEBUG } from '@/config';
import { LinkToPage } from '@/utils';
import { detectIsMobileFromUserAgent } from '../utils/serverMobileDetection';
import { BOTTOM_BAR_DESKTOP_VISIBLE } from './config';
import PublicLayoutClient from './PublicLayoutClient';
import { headers } from 'next/headers';

const TITLE_PUBLIC = 'Unauthorized - FOOBAR';

const BASE_SIDE_BAR_ITEMS: Array<LinkToPage> = [
  { title: 'Home', path: '/', icon: 'home' },
  { title: 'Log In', path: '/auth/login', icon: 'login' },
  { title: 'Sign Up', path: '/auth/signup', icon: 'signup' },
  { title: 'About', path: '/about', icon: 'info' },
];

const BOTTOM_BAR_ITEMS: Array<LinkToPage> = [
  { title: 'Log In', path: '/auth/login', icon: 'login' },
  { title: 'Sign Up', path: '/auth/signup', icon: 'signup' },
  { title: 'About', path: '/about', icon: 'info' },
];

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const ua = (await headers()).get('user-agent');
  const initialIsMobile = detectIsMobileFromUserAgent(ua);
  const sidebarItems = [...BASE_SIDE_BAR_ITEMS];
  if (IS_DEBUG) sidebarItems.push({ title: '[Debug Tools]', path: '/dev', icon: 'settings' });

  return (
    <PublicLayoutClient
      title={TITLE_PUBLIC}
      sidebarItems={sidebarItems}
      bottomBarItems={BOTTOM_BAR_ITEMS}
      initialIsMobile={initialIsMobile}
      bottomBarDesktopVisible={BOTTOM_BAR_DESKTOP_VISIBLE}
    >
      {children}
    </PublicLayoutClient>
  );
};

export default PublicLayout;
