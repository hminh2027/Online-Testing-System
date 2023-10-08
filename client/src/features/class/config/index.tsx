import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

export const classSegments = [
  {
    label: 'Lớp học của bạn',
    value: 'false',
  },
  {
    label: 'Lớp học đã khoá',
    value: 'true',
  },
];

export const displaySegments = [
  {
    value: 'List',
    icon: <BarsOutlined />,
  },
  {
    value: 'Kanban',
    icon: <AppstoreOutlined />,
  },
];
