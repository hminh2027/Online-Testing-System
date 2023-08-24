import type { TableColumnsType } from 'antd';
import { Button, Segmented, Space, Typography } from 'antd';
import { capitalize } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { classSegments, displaySegments } from './config';
import { GRADE } from '@/constants';
import type { Action } from '@/components/CustomTable';
import CustomTable from '@/components/CustomTable';
import CustomSpace from '@/components/CustomSpace';

const columns: TableColumnsType = [
  {
    title: 'Tên lớp',
    key: 'name',
    dataIndex: 'name',
    render: (value: string) => (
      <Typography.Text strong>{value}</Typography.Text>
    ),
  },
  {
    title: 'Lớp',
    key: 'grade',
    dataIndex: 'grade',
    render: (value: string) => capitalize(value),
  },
  {
    title: 'Học sinh',
    key: 'studentCount',
    dataIndex: 'studentCount',
    align: 'center',
  },
  {
    title: 'Bài thi',
    key: 'examCount',
    dataIndex: 'examCount',
    align: 'center',
  },
  {
    title: 'Tài liệu',
    key: 'resourceCount',
    dataIndex: 'resourceCount',
    align: 'center',
  },
];

const dataSource = [
  {
    id: 1,
    name: 'Lớp toán thầy Minh ôn luyện 2k5',
    studentCount: 1,
    examCount: 3,
    resourceCount: 0,
    grade: GRADE.highschool,
  },
  {
    id: 2,
    name: 'Lớp học chứng khoán lùa gà cục tác',
    studentCount: 32,
    examCount: 0,
    resourceCount: 10,
    grade: GRADE.other,
  },
];

const actionHeaderMock: Action[] = [
  {
    element: <Button type="primary">Create</Button>,
  },
  {
    element: <Button>Edit</Button>,
  },
  {
    element: <Button>Activate</Button>,
  },
  {
    element: <Button>Deactivate</Button>,
  },
];

interface ClassesPageProps {}
export default function ClassesPage({}: ClassesPageProps) {
  return (
    <CustomSpace direction="vertical" fullWidth>
      <CustomTable
        actionHeader={actionHeaderMock}
        showSearch
        showFilter
        columns={columns}
        dataSource={dataSource}
      />
    </CustomSpace>
  );
}
