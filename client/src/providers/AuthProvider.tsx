import { useLayoutEffect, type PropsWithChildren } from 'react';
import { useAuth } from '@/features/auth';
import { storage } from '@/utils';

export function AuthProvider({ children }: PropsWithChildren) {
  const { getMe } = useAuth();

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        await getMe();
      } catch (err) {
        storage.clearToken();
        window.location.href = 'login';
      }
    })();
  }, []);

  return <div>{children}</div>;
}
