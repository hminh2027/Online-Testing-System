import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import type { Exam } from '../../types';
import { formatTime } from '@/utils';

export const columns: ColumnsType<Exam> = [
  {
    key: 'title',
    title: 'Tiêu đề bài kiểm tra',
    dataIndex: 'title',
    ellipsis: true,
    render: (value: string, record: Exam) => <Link to={`${record.id}`}>{value}</Link>,
  },
  {
    key: 'description',
    title: 'Mô tả',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    key: 'duration',
    title: 'Thời lượng (phút)',
    dataIndex: 'duration',
    ellipsis: true,
    align: 'center',
  },
  {
    key: 'createdAt',
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    ellipsis: true,
    render: (date: Date) => <>{formatTime(date)}</>,
  },
];
