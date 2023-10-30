import type { ColumnsType } from 'antd/es/table';

import { Link } from 'react-router-dom';
import type { ClassRoom } from '../../types';

export const columns: ColumnsType<ClassRoom> = [
  {
    key: 'name',
    title: 'Tên lớp học',
    dataIndex: 'name',
    ellipsis: true,
    render: (value: string, record: ClassRoom) => <Link to={`${record.code}`}>{value}</Link>,
  },
  {
    key: 'description',
    title: 'Mô tả lớp học',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    key: 'code',
    title: 'Mã lớp',
    dataIndex: 'code',
    ellipsis: true,
  },
];
