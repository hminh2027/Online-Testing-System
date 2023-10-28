import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './index.module.css';

interface ExamDetailLayoutProps {
  children?: ReactNode;
}

const sideNavItems = [
  {
    label: 'Tổng quan',
    path: 'overview',
  },
  {
    label: 'Nội dung đề',
    path: 'edit',
  },
];

const items: MenuProps['items'] = sideNavItems.map((item) => ({
  key: item.path,
  label: <NavLink to={`${item.path}`}>{item.label}</NavLink>,
}));

export function ExamDetailLayout({ children }: ExamDetailLayoutProps) {
  return (
    <Layout
      style={{
        height: '100%',
      }}
    >
      <Layout.Sider>
        <Menu
          mode="vertical"
          items={items}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Layout.Sider>
      <Content className={styles.content}>{children ?? <Outlet />}</Content>
    </Layout>
  );
}
