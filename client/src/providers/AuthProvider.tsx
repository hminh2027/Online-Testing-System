import { useLayoutEffect, type PropsWithChildren } from 'react';
import { useAuth } from '@/features/auth';

export function AuthProvider({ children }: PropsWithChildren) {
  const { getMe } = useAuth();

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      await getMe();
    })();
  }, []);

  return <div>{children}</div>;
}
