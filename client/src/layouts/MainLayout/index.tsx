import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

interface MainLayoutProps {
  children?: ReactNode;
  menuItems: object;
}
export default function MainLayout({ children, menuItems }: MainLayoutProps) {
  return <Container>{children ?? <Outlet />}</Container>;
}
