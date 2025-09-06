import { IS_DEBUG } from '@/config';
import { LinkToPage } from '@/utils';
import TopBarAndSideBarLayout from './components/TopBarAndSideBarLayout';

const TITLE_PRIVATE = 'FOOBAR Private'; // Title for pages after authentication

/**
 * SideBar navigation items with links for Private Layout
 */
const SIDE_BAR_ITEMS: Array<LinkToPage> = [
  { title: 'Home', path: '/', icon: 'home' },
  { title: 'My Profile', path: '/me', icon: 'account' },
  { title: '404', path: '/wrong-url', icon: 'error' },
  { title: 'About', path: '/about', icon: 'info' },
];

// Add debug links
IS_DEBUG && SIDE_BAR_ITEMS.push({ title: '[Debug Tools]', path: '/dev', icon: 'settings' });

/**
 * Renders "Private Layout" composition
 * @layout PrivateLayout
 */
const PrivateLayout: React.FC<React.PropsWithChildren> = (props) => {
  // const locale = useContext(LocaleContext); // use if needed for localized labels
  // document.title = TITLE_PRIVATE;

  return (
    <TopBarAndSideBarLayout sidebarItems={SIDE_BAR_ITEMS} title={TITLE_PRIVATE} variant="sidebarPersistentOnDesktop">
      {props.children}
      {/* <Stack component="footer">Copyright &copy; </Stack> */}
    </TopBarAndSideBarLayout>
  );
};

export default PrivateLayout;
