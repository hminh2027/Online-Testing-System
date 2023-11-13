import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface ExamClassLayoutProps {
  children?: ReactNode;
}

export function ExamClassLayout({ children }: ExamClassLayoutProps) {
  return (
    <Layout hasSider style={{ height: '100%' }}>
      <Content
        style={{
          height: '100%',
        }}
      >
        {children ?? <Outlet />}
      </Content>
      <Layout.Sider
        width="20%"
        style={{
          height: '100%',
          backgroundColor: 'inherit',
          overflow: 'auto',
        }}
      >
        temp
      </Layout.Sider>
    </Layout>
  );
}
