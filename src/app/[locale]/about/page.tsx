import { Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';

/**
 * Renders About Application page
 * @page About
 */
const AboutPage: NextPage = () => {
  const t = useTranslations('About');
  return (
    <Stack spacing={2} padding={2}>
      <Stack>
        <Typography variant="h3">{t('title')}</Typography>
      </Stack>
    </Stack>
  );
};

export default AboutPage;
