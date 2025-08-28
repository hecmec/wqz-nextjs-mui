import { AppBar, Toolbar, Typography } from '@mui/material';
import { getLocale } from 'next-intl/server';
import { title } from 'process';
import { JSX } from 'react';
import { Link } from '../../i18n/routing';

interface TopBarProps {
  endNode?: JSX.Element;
  startNode?: JSX.Element;
  title?: string;
}

/**
 * Renders TopBar composition
 * @component TopBar
 */
const TopBar = async ({ endNode, startNode, title: string = '', ...restOfProps }: TopBarProps) => {
  const currentLocale = await getLocale();

  return (
    <AppBar
      component="div"
      sx={
        {
          // boxShadow: 'none', // Uncomment to hide shadow
        }
      }
      {...restOfProps}
    >
      <Toolbar disableGutters sx={{ paddingX: 1 }}>
        {startNode}

        <Typography variant="h6" sx={{ marginX: 1, flexGrow: 1, textAlign: 'center', whiteSpace: 'nowrap' }}>
          {title}
        </Typography>

        {currentLocale !== 'de' && (
          <Link href="/" locale="de">
            de
          </Link>
        )}

        {endNode}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
