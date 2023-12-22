import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  List,
  Modal,
  Space,
  Typography,
} from 'antd';
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
import dayjs from 'dayjs';
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
  ): { label: string; value: string; icon?: ReactNode; form?: ReactNode }[] => [
    {
      label: 'Email',
      value: `${details.email}`,
      icon: <MailOutlined />,
    },
    {
      label: 'Mật khẩu',
      value: '*******',
      icon: <EyeInvisibleOutlined />,
      form: (
        <Form>
          <Form.Item>
            <Input.Password placeholder="Nhập mật khẩu hiện tại..." />
          </Form.Item>
          <Form.Item>
            <Input.Password placeholder="Nhập mật khẩu mới..." />
          </Form.Item>
          <Form.Item>
            <Input.Password placeholder="Xác nhận mật khẩu mới..." />
          </Form.Item>
        </Form>
      ),
    },
    {
      label: 'Tên đầy đủ',
      value: `${details.fullname}`,
      icon: <UserOutlined />,
      form: (
        <Form>
          <Form.Item>
            <Input type="text" defaultValue={details.fullname} placeholder="Nhập họ tên..." />
          </Form.Item>
        </Form>
      ),
    },
    {
      label: 'Số điện thoại',
      value: `${details.phone}`,
      icon: <PhoneOutlined />,
      form: (
        <Form>
          <Form.Item>
            <Input type="tel" defaultValue={details.phone} placeholder="Nhập số điện thoại..." />
          </Form.Item>
        </Form>
      ),
    },
    {
      label: 'Ngày sinh',
      value: `${details.birth}`,
      icon: <HeartOutlined />,
      form: (
        <Form>
          <Form.Item>
            <DatePicker defaultValue={dayjs(details.birth)} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      ),
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

  const handleDisplayModal = (title: string, component: ReactNode) =>
    Modal.confirm({
      icon: null,
      content: component,
      closable: true,
      maskClosable: true,
      title: `Cập nhật ${title}`,
      centered: true,
      cancelText: 'Huỷ',
    });

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

              <Button
                type="link"
                onClick={() => handleDisplayModal(detail.label, detail.form)}
                disabled={!detail.form}
              >
                Chỉnh sửa
              </Button>
            </Flex>
          ))}
      </Flex>
    </CustomCard>
  );
}
