import { Button, Form, Input, Modal, Typography } from 'antd';
import { useAuth } from '@/features/auth/hooks';

export interface LoginUtcPayload {
  studentId: string;
  password: string;
}

interface LoginModalProps {
  isModalOpen: boolean;
}
export function LoginModal({ isModalOpen }: LoginModalProps) {
  const [utcForm] = Form.useForm();
  const { logInUtc } = useAuth();

  const handleSubmit = (values: LoginUtcPayload) => {
    logInUtc(values);
  };

  return (
    <Modal title="Basic Modal" open={isModalOpen}>
      <Typography.Title>Đăng Nhập</Typography.Title>

      <Form
        autoComplete="off"
        form={utcForm}
        name="utc-login"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Mã sinh viên" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Mật khẩu" name="password">
          <Input type="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
