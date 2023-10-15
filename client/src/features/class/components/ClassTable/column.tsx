import { Badge, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { ClassRoom } from '../../types';

export const columns = (handleClick: (record: ClassRoom) => void): ColumnsType<ClassRoom> => [
  {
    key: 'name',
    title: 'Tên lớp họce',
    dataIndex: 'name',
    width: 200,
    sorter: true,
    ellipsis: true,
    render: (value: string, record: ClassRoom) => (
      <Typography.Link onClick={() => handleClick(record)} strong>
        {value}
      </Typography.Link>
    ),
  },
  {
    key: 'description',
    title: 'Mô tả lớp học',
    dataIndex: 'description',
    sorter: true,
    width: 292,
    ellipsis: true,
  },
  {
    key: 'billingAddress',
    title: 'Billing address',
    dataIndex: ['billingAddress'],
    sorter: true,
    width: 490,
    ellipsis: true,
  },
  {
    key: 'isActive',
    title: 'Trạng thái',
    dataIndex: 'isActive',
    sorter: true,
    width: 170,
    ellipsis: true,
    render: (value: boolean) => <Badge status="success" text={value} />,
  },
];
