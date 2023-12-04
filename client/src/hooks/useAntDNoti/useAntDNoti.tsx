import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';

import { Typography, notification } from 'antd';

enum NotificationEnum {
  success = 'Thành công',
  info = 'Thông báo',
  warning = 'Chú ý',
  error = 'Thất bại',
}
type NotificationType = keyof typeof NotificationEnum;

interface NotifyProps {
  type: NotificationType;
  title?: string;
  description?: string;
}
interface AntDNotiProps {
  notify: (config: NotifyProps) => void;
}
const NotificationContext = createContext({});

export function NotificationProvider({ children }: PropsWithChildren) {
  const [api, contextHolder] = notification.useNotification();

  const notify = useCallback(
    ({ type, description, title }: NotifyProps) => {
      api[type]({
        message: <Typography.Title level={5}>{title ?? NotificationEnum[type]}</Typography.Title>,
        description,
        duration: 3,
        placement: 'bottomLeft',
      });
    },
    [api],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

export function useAntDNoti() {
  return useContext(NotificationContext) as AntDNotiProps;
}
