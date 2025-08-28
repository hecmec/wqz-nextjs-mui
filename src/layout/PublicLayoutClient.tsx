'use client';
import { LinkToPage } from '@/utils';
import { Stack } from '@mui/material';
import React from 'react';
import { BottomBar } from './components';
import TopBarAndSideBarLayout from './TopBarAndSideBarLayout';

interface PublicLayoutClientProps {
  children: React.ReactNode;
  sidebarItems: Array<LinkToPage>;
  bottomBarItems: Array<LinkToPage>;
  title: string;
  initialIsMobile: boolean;
  bottomBarDesktopVisible: boolean;
}

const PublicLayoutClient: React.FC<PublicLayoutClientProps> = ({
  children,
  sidebarItems,
  bottomBarItems,
  title,
  initialIsMobile,
  bottomBarDesktopVisible,
}) => {
  // During/after hydration you could enhance with a resize hook if needed.
  const bottomBarVisible = initialIsMobile || bottomBarDesktopVisible;

  return (
    <TopBarAndSideBarLayout sidebarItems={sidebarItems} title={title} variant="sidebarAlwaysTemporary">
      {children}
      <Stack component="footer">{bottomBarVisible && <BottomBar items={bottomBarItems} />}</Stack>
    </TopBarAndSideBarLayout>
  );
};

export default PublicLayoutClient;
