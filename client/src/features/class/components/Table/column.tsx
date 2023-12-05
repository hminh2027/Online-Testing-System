import type { ColumnsType } from 'antd/es/table';

import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import type { ClassRoom } from '../../types';
import type { Exam } from '@/features/exam/types';

export const columns = (isShowExam: boolean): ColumnsType<ClassRoom> => [
  {
    key: 'name',
    title: 'Tên lớp học',
    dataIndex: 'name',
    ellipsis: true,
    render: (value: string, record: ClassRoom) => <Link to={`${record.code}`}>{value}</Link>,
  },
  {
    key: 'exam',
    title: 'Bài kiểm tra đang giao',
    dataIndex: 'Exam',
    render: (values: Exam[]) =>
      isShowExam
        ? values.map((exam) => (
            <Tag style={{ margin: 5 }} key={exam.title} color="geekblue">
              {exam.title}
            </Tag>
          ))
        : 'Không hiển thị',
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
