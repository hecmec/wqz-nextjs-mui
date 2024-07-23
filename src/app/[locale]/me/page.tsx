import { AppAlert, UserInfo } from '@/components';
import { Stack } from '@mui/material';
import { NextPage } from 'next';

/**
 * Renders User Profile Page
 * @page Me
 */
const MeAkaProfilePage: NextPage = () => {
  return (
    <Stack spacing={2} padding={2}>
      <AppAlert severity="warning">This page is under construction</AppAlert>
      <UserInfo showAvatar />
    </Stack>
  );
};

export default MeAkaProfilePage;
