import { type PropsWithChildren } from 'react';
import { useAsync } from 'react-use';
import { useAuth } from '@/features/auth';
import { storage } from '@/utils';

export function AuthProvider({ children }: PropsWithChildren) {
  const { getMe } = useAuth();

  useAsync(async () => {
    try {
      await getMe();
    } catch (err) {
      storage.clearToken();
      window.location.href = 'login';
    }
  }, []);

  return <div>{children}</div>;
}
