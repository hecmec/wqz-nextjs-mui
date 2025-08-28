'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NotFoundPageContent: React.FC = () => {
  const pathname = usePathname();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      textAlign="center"
    >
      <Typography variant="h3" gutterBottom>
        404 - Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The URL <b>{pathname}</b> is not accessible or does not exist.
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        You may want to visit one of the following pages:
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
        <Button component={Link} href="/" variant="contained" color="primary">
          Home
        </Button>
        <Button component={Link} href="/quizlist" variant="outlined" color="primary">
          Quiz List
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFoundPageContent;
