import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children?: ReactNode;
  menuItems: object;
}

const navItems = [
  {
    label: 'Tong quan',
    path: 'overview',
  },
  {
    label: 'Lop hoc',
    path: 'class',
  },
  {
    label: 'Lich thi',
    path: 'schedule',
  },
];

const sideNavItems = [
  {
    label: 'Tong quan',
    path: 'class/hello',
  },
  {
    label: 'Lop hoc',
    path: 'class/bello',
  },
  {
    label: 'Lich thi',
    path: 'schedule',
  },
];

const items1: MenuProps['items'] = navItems.map((item) => ({
  key: item.path,
  label: <NavLink to={`/${item.path}`}>{item.label}</NavLink>,
}));

const items2: MenuProps['items'] = sideNavItems.map((item) => ({
  key: item.path,
  label: <NavLink to={`/${item.path}`}>{item.label}</NavLink>,
}));

export default function MainLayout({ children, menuItems }: MainLayoutProps) {
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'inherit',
          justifyContent: 'space-between',
        }}
      >
        <div>LOGO</div>
        <Menu mode="horizontal" items={items1} style={{ width: '100%' }} />
      </Header>
      <Content>{children ?? <Outlet />}</Content>
    </Layout>
  );
}
