import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface ClassDetailLayoutProps {
  children?: ReactNode;
}

const sideNavItems = [
  {
    label: 'Bảng tin',
    path: 'newsfeed',
  },
  {
    label: 'Thành viên',
    path: 'students',
  },
  {
    label: 'Bài kiểm tra',
    path: 'exams',
  },
  {
    label: 'Lịch thi',
    path: 'schedule',
  },
];

const items2: MenuProps['items'] = sideNavItems.map((item) => ({
  key: item.path,
  label: <NavLink to={`${item.path}`}>{item.label}</NavLink>,
}));

export function ClassDetailLayout({ children }: ClassDetailLayoutProps) {
  return (
    <Layout style={{ height: '100%' }}>
      <Sider>
        <Menu
          mode="vertical"
          items={items2}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Sider>
      <Content>{children ?? <Outlet />}</Content>
    </Layout>
  );
}
