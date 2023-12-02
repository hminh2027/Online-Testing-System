import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import type { Exam } from '../../../types';
import { formatISOToVi } from '@/utils';

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
    key: 'class',
    title: 'Lớp đang giao',
    dataIndex: ['Class', 'name'],
    ellipsis: true,
    render: (value: string, record: Exam) =>
      value && (
        <Link to={`/class/${record.classCode}`}>
          <Tag color="blue">{value}</Tag>
        </Link>
      ),
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
    render: (date: Date) => <>{formatISOToVi(date)}</>,
  },
];
