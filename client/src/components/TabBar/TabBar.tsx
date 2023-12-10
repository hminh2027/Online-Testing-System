import { Menu, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-use';
import type { TabBarCustomConfig } from './config';

interface TabBarProps {
  items: TabBarCustomConfig[];
}

export function TabBar({ items }: TabBarProps) {
  const location = useLocation();
  const [curPath, setCurPath] = useState<string>('');

  useEffect(() => {
    if (!location.pathname) return;
    const path = location.pathname.split('/')[1];

    setCurPath(path);
  }, [location.pathname]);

  const mappedItems = items.map((item) => ({
    key: `${item.path}`,
    label: (
      <NavLink to={`/${item.path}`}>
        <Typography.Text strong>{item.label}</Typography.Text>
      </NavLink>
    ),
  }));

  return <Menu disabledOverflow selectedKeys={[curPath]} mode="horizontal" items={mappedItems} />;
}
