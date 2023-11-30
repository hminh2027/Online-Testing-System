import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { useEffectOnce } from 'react-use';
import { socket } from './libs/socket';

enum Events {
  Test = 'test',
  CreatePost = 'createPost',
  CreateNoti = 'createNoti',
}

export function SocketClient({ children }: PropsWithChildren) {
  const onCreatePost = () => socket.on(Events.CreatePost, console.log('first'));
  const onCreateNoti = () => socket.on(Events.CreateNoti, console.log('first'));

  useEffectOnce(() => {
    onCreatePost();
    onCreateNoti();

    return () => {
      socket.off(Events.CreatePost);
      socket.off(Events.CreateNoti);
    };
  });

  return <>{children || <Outlet />}</>;
}
