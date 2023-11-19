import { useLayoutEffect, useEffect, type PropsWithChildren } from 'react';
import { useAuth } from '@/features/auth';
import { storage } from '@/utils';
import { socket } from '@/libs/socket';

export function AuthProvider({ children }: PropsWithChildren) {
  const { getMe, user } = useAuth();

  const onConnect = () => console.log('Client connected:', socket.id);

  const onDisconnect = () => socket.disconnect();

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [user]);

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
