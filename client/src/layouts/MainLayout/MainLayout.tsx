import { Image, Layout, Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Logo from '@/assets/logo.png';
import styles from './index.module.css';
import { studentTabs, teacherTabs } from '@/components/TabBar/config';
import { TabBar } from '@/components/TabBar';
import { Notification } from '@/components/Notification';
import { UserHeader } from '@/components/UserHeader';
import { useAuthStore } from '@/features/auth/stores';
import { DrawerContextProvider } from '@/hooks/useDrawer';

interface MainLayoutProps {
  children?: ReactNode;
  // items: [];
}

export function MainLayout({ children }: MainLayoutProps) {
  const { username, isTeacher } = {
    username: 'Vu Hoang Minh',
    isTeacher: false,
  };

  const { isAuthed } = useAuthStore();

  return (
    <>
      {!isAuthed ? (
        <Navigate to="/login" />
      ) : (
        <Layout style={{ height: '100%' }}>
          <Header className={styles.header}>
            <Image preview={false} height="100%" src={Logo} />
            <TabBar items={isTeacher ? teacherTabs : studentTabs} />
            <Space>
              <Notification count={15} />
              <UserHeader username={username} />
            </Space>
          </Header>
          <Content>
            <DrawerContextProvider>{children ?? <Outlet />}</DrawerContextProvider>
          </Content>
        </Layout>
      )}
    </>
  );
}
