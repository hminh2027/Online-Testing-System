import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Divider, Flex, Form, List, Row, Space, Typography } from 'antd';
import {
  EyeInvisibleOutlined,
  FieldTimeOutlined,
  HeartOutlined,
  HomeOutlined,
  MailOutlined,
  NumberOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { User } from '..';
import { useAuth } from '@/features/auth';
import { CustomCard, Uploader } from '@/components';
import { useUserMutation } from '../hooks/useUserMutation';
import { formatISOToVi } from '@/utils';

export default function UserProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const { updateFn } = useUserMutation();
  const [userDetals, setUserDetails] = useState<User>();

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id && user) {
      setUserDetails(user);
      setImage(user.imageUrl ?? '');
    }
  }, [id, user]);

  const handleUpdateImage = () =>
    updateFn({
      id: user?.id as number,
      payload: { imageUrl: image ?? '' },
    });

  const convertToDetailArray = (
    details: User,
  ): { label: string; value: string; icon?: ReactNode }[] => [
    {
      label: 'Email',
      value: `${details.email}`,
      icon: <MailOutlined />,
    },
    {
      label: 'Mật khẩu',
      value: '*******',
      icon: <EyeInvisibleOutlined />,
    },
    {
      label: 'Tên đầy đủ',
      value: `${details.fullname}`,
      icon: <UserOutlined />,
    },
    {
      label: 'Số điện thoại',
      value: `${details.phone}`,
      icon: <PhoneOutlined />,
    },
    {
      label: 'Ngày sinh',
      value: `${details.birth}`,
      icon: <HeartOutlined />,
    },
    {
      label: 'Vai trò',
      value: details.isTeacher ? 'Giáo viên' : 'Học sinh',
      icon: <TeamOutlined />,
    },
    {
      label: 'Mã sinh viên',
      value: `${details.studentId}`,
      icon: <NumberOutlined />,
    },
    {
      label: 'Trường học',
      value: `${details.school}`,
      icon: <HomeOutlined />,
    },
    {
      label: 'Tạo tài khoản ngày',
      value: details.createdAt ? formatISOToVi(details.createdAt) : '',
      icon: <FieldTimeOutlined />,
    },
  ];

  return (
    <CustomCard
      title="Hồ sơ người dùng"
      hasShadow
      style={{
        width: '60%',
        margin: 'auto',
      }}
    >
      <Flex vertical gap={8}>
        <Uploader image={image} setImage={setImage} />
        <Button block type="primary" onClick={handleUpdateImage}>
          Cập nhật ảnh
        </Button>
        <Divider>Thông tin tài khoản</Divider>
        <List />
        {userDetals &&
          convertToDetailArray(userDetals).map((detail) => (
            <Flex justify="space-between" key={detail.label}>
              <Typography.Text>
                <Space>
                  {detail.icon && detail.icon}
                  {detail.label}
                </Space>
              </Typography.Text>
              <Typography.Text> {detail.value}</Typography.Text>

              <Button type="link">Chỉnh sửa</Button>
            </Flex>
          ))}
      </Flex>
    </CustomCard>
  );
}
