import { Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface UserClassLayoutProps {
  children?: ReactNode;
}

export function UserClassLayout({ children }: UserClassLayoutProps) {
  return (
    <Layout style={{ height: '100%' }}>
      <Content
        style={{
          height: '100%',
        }}
      >
        {children ?? <Outlet />}
      </Content>
      <Sider style={{ height: '100%' }}>danh sach request</Sider>
    </Layout>
  );
}
