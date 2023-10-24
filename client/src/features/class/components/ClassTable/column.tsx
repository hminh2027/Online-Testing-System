import { Badge, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { Link } from 'react-router-dom';
import type { ClassRoom } from '../../types';
import { Status } from '@/components';
import { STATUS } from '@/constants';

export const columns: ColumnsType<ClassRoom> = [
  {
    key: 'name',
    title: 'Tên lớp học',
    dataIndex: 'name',
    sorter: true,
    ellipsis: true,
    render: (value: string, record: ClassRoom) => <Link to={`${record.code}`}>{value}</Link>,
  },
  {
    key: 'description',
    title: 'Mô tả lớp học',
    dataIndex: 'description',
    sorter: true,
    ellipsis: true,
  },
  {
    key: 'code',
    title: 'Mã lớp',
    dataIndex: 'code',
    ellipsis: true,
  },
  {
    key: 'isActive',
    title: 'Trạng thái',
    dataIndex: 'isActive',
    sorter: true,
    ellipsis: true,
    render: (value: boolean) => <Status status={value ? STATUS.ACTIVE : STATUS.INACTIVE} />,
  },
];
