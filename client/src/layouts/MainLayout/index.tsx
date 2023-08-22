import { Image, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../../../public/logo.png';
import TabBar from './components/TabBar';
import UserHeader from './components/UserHeader';
import styles from './index.module.css';

interface MainLayoutProps {
  children?: ReactNode;
  // items: [];
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout>
      <Header className={styles.header}>
        <Image preview={false} height="100%" src={Logo} alt="logo" />
        <TabBar />
        <UserHeader username="Vu Hoang Minh" />
      </Header>
      <Content>{children ?? <Outlet />}</Content>
    </Layout>
  );
}
