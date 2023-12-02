import type { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import type { UserClass } from '@/features/userClass/types';
import type { User } from '@/features/user';
import { CustomAvatar } from '@/components';
import { formatISOToVi } from '@/utils';

export const columns: ColumnsType<UserClass> = [
  {
    key: 'fullname',
    title: 'Tên học sinh',
    dataIndex: ['User'],
    ellipsis: true,
    render: (value: User) => (
      <Space>
        <CustomAvatar src={value.imageUrl} name={value.fullname} />
        {value.fullname}
      </Space>
    ),
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: ['User', 'email'],
    ellipsis: true,
  },
  {
    key: 'phone',
    title: 'Số điện thoại',
    dataIndex: ['User', 'phone'],
    ellipsis: true,
  },
  {
    key: 'studentId',
    title: 'Mã sinh viên',
    dataIndex: ['User', 'studentId'],
    ellipsis: true,
  },
  {
    key: 'school',
    title: 'Học trường',
    dataIndex: ['User', 'school'],
    ellipsis: true,
  },
  {
    key: 'birth',
    title: 'Ngày sinh',
    dataIndex: ['User', 'birth'],
    ellipsis: true,
  },
  {
    key: 'createdAt',
    title: 'Vào lớp ngày',
    dataIndex: 'createdAt',
    ellipsis: true,
    render: (value: Date) => formatISOToVi(value),
  },
];
