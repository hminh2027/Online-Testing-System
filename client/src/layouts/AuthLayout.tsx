import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { useEffectOnce } from 'react-use';

import { useAuth, useAuthStore } from '@/features/auth';

export function AuthLayout({ children }: PropsWithChildren) {
  const { getMe } = useAuth();
  const { user } = useAuthStore();

  return <>{children ?? <Outlet />}</>;
}
