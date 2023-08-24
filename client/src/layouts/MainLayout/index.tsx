import { Image, Layout, Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Notification from '@/components/Notification';
import Logo from '@/assets/logo.png';
import styles from './index.module.css';
import TabBar from '@/components/TabBar';
import UserHeader from '@/components/UserHeader';
import { studentTabs, teacherTabs } from '@/components/TabBar/config';

interface MainLayoutProps {
  children?: ReactNode;
  // items: [];
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { username, isTeacher } = {
    username: 'Vu Hoang Minh',
    isTeacher: false,
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <Image preview={false} height="100%" src={Logo} />
        <TabBar items={isTeacher ? teacherTabs : studentTabs} />
        <Space>
          <Notification count={15} />
          <UserHeader username={username} />
        </Space>
      </Header>
      <Content>{children ?? <Outlet />}</Content>
    </Layout>
  );
}
