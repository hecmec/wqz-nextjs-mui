import { Stack, Typography } from '@mui/material';
import { Metadata, NextPage } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '../../../i18n/routing';

export const metadata: Metadata = {
  title: 'Wunderquiz',
  description: '_DESCRIPTION_',
};

/**
 * Main page of the Application
 * @page Home
 */
const Home: NextPage = async () => {
  const t = await getTranslations('Home');
  return (
    <Stack spacing={2} padding={2}>
      <Stack>
        <Typography variant="h3">{t('title')}</Typography>
        <Typography variant="body1">{t('body1')}</Typography>
        <Typography variant="body2">{t('body2')}</Typography>
        {/* Don't put locale into path
        https://next-intl.dev/docs/routing/navigation */}
        <Link href="/about">{t('about')}</Link>
      </Stack>
    </Stack>
  );
};

export default Home;
