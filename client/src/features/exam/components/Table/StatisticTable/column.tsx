import type { ColumnsType } from 'antd/es/table';
import { Typography } from 'antd';
import type { Attempt } from '@/features/attempt/types';
import { formatISOToVi } from '@/utils';

export const columns = (getLink: (examId: number) => string): ColumnsType<Attempt> => [
  {
    key: 'user',
    title: 'Người làm',
    dataIndex: ['User', 'fullname'],
  },
  {
    key: 'point',
    title: 'Điểm',
    align: 'center',
    dataIndex: 'point',
  },
  {
    key: 'numberOfMouseLeave',
    title: 'Số lần rời bài thi',
    align: 'center',
    dataIndex: 'numberOfMouseLeave',
  },
  {
    key: 'startedAt',
    title: 'Bắt đầu lúc',
    align: 'center',
    dataIndex: 'startedAt',
    render: (value: Date) => formatISOToVi(value),
  },
  {
    key: 'endedAt',
    title: 'Nộp lúc',
    align: 'center',
    dataIndex: 'endedAt',
    render: (value: Date) => (value ? formatISOToVi(value) : 'Đang làm'),
  },
  {
    key: 'id',
    title: 'Hành động',
    align: 'center',
    dataIndex: 'examId',
    render: (value: number) => <Typography.Link href={getLink(value)}>Chi tiết</Typography.Link>,
  },
];
