'use client';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AppButton, AppLink } from '@/components';
import { useAppStore } from '@/store';
import { useEventLogout } from '@/hooks';
import { sessionStorageSet } from '@/utils';
import { loginUser, logoutUser } from '@/actions/authActions';

/**
 * Renders login form for user to authenticate
 * @component LoginForm
 */
const LoginForm = () => {
  const router = useRouter();
  const [, dispatch] = useAppStore();

  const onLogin = async () => {
    const res = await loginUser('demo@example.com', 'demo'); // replace with form data
    if (res.ok) {
      // sessionStorageSet('access_token', 'TODO:_save-real-access-token-here');
      dispatch({ type: 'LOG_IN', currentUser: res.user });
      router.replace('/');
    } else {
      // handle error (toast/snackbar)
      console.error(res.error);
    }
  };

  const onLogout = async () => {
    await logoutUser();
    useEventLogout();
  };


  return (
    <Stack alignItems="center" spacing={2} padding={2}>
      <Stack>Put form controls or add social login buttons here...</Stack>

      <Stack direction="row">
        <AppButton color="success" onClick={onLogin}>
          Emulate User Login
        </AppButton>
        <AppButton color="warning" onClick={onLogout}>
          Logout User
        </AppButton>
      </Stack>

      <div>
        The source code is available at{' '}
        <AppLink href="https://github.com/karpolan/nextjs-mui-starter-ts">GitHub</AppLink>
      </div>
    </Stack>
  );
};

export default LoginForm;

