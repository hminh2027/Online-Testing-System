import { useEffect, type PropsWithChildren } from 'react';
import { useEffectOnce } from 'react-use';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/stores';
import { useAuth } from '@/features/auth';
import type { ResUserItem } from '@/features/user';
import { CustomMessage } from '@/components';

export function AuthLayout({ children }: PropsWithChildren) {
  const { getMe } = useAuth();
  const { setUser, user } = useAuthStore();
  const navigate = useNavigate();

  useEffectOnce(() => {
    getMe()
      .then((res: ResUserItem) => setUser(res.content))
      .catch((err: string) => CustomMessage.error(err));
  });

  useEffect(() => {
    if (user) return navigate('class');

    return navigate('/login');
  }, [navigate, user]);

  return <>{children || <Outlet />}</>;
}
