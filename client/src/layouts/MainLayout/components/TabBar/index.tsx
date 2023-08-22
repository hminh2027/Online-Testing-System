import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

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
  const mappedItems = items.map((item) => ({
    key: item.path,
    label: <NavLink to={`/${item.path}`}>{item.label}</NavLink>,
  }));

  return <Menu mode="horizontal" items={mappedItems} />;
}
