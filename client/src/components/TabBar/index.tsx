import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-use';

const items = [
  {
    label: 'Tổng quan',
    path: 'overview',
  },
  {
    label: 'Lớp học',
    path: 'class',
  },
  {
    label: 'Lịch thi',
    path: 'schedule',
  },
];

export default function TabBar() {
  const location = useLocation();
  const [curPath, setCurPath] = useState<string>('');

  useEffect(() => {
    if (!location.pathname) return;
    const path = location.pathname.split('/')[1];

    setCurPath(path);
  }, [location.pathname]);

  const mappedItems = items.map((item) => ({
    key: `${item.path}`,
    label: <NavLink to={`/${item.path}`}>{item.label}</NavLink>,
  }));

  return (
    <Menu selectedKeys={[curPath]} mode="horizontal" items={mappedItems} />
  );
}
