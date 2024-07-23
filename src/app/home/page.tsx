import { Stack, Typography } from '@mui/material';
import { Metadata, NextPage } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Wunderquiz',
  description: '_DESCRIPTION_',
};

/**
 * Main page of the Application
 * @page Home
 */
const Home: NextPage = () => {
  const t = useTranslations('Home');
  return (
    <Stack spacing={2} padding={2}>
      <Stack>
        <Typography variant="h3">{t('title')}</Typography>
        <Typography variant="body1">{t('body1')}</Typography>
        <Typography variant="body2">{t('body2')}</Typography>
      </Stack>
    </Stack>
  );
};

export default Home;
