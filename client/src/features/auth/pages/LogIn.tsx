import { Button, Divider, Form, Input, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomCard } from '@/components/CustomCard';
import { CustomSpace } from '@/components/CustomSpace';
import { useAuth } from '@/features/auth/hooks';
import type { LoginPayload } from '..';
import { useAuthStore } from '@/features/auth/stores';
import { createValidator } from '@/utils/validator';
import { logInSchema } from '@/features/auth/schemas/logInSchema';

export default function Login() {
  const { logIn } = useAuth();
  const { isAuthed } = useAuthStore();
  const navigator = useNavigate();
  const [form] = Form.useForm();

  const yupSync = createValidator(logInSchema);

  useEffect(() => {
    if (isAuthed) navigator('/class');
  });

  const handleSubmit = (values: LoginPayload) => {
    logIn(values);
  };

  return (
    <CustomSpace
      isFullWidth
      justify="center"
      align="center"
      direction="vertical"
      style={{
        minHeight: '100vh',
        margin: 'auto',
        // width: '1000px',
      }}
    >
      <Typography.Title>Đăng Nhập</Typography.Title>
      <CustomCard hasShadow>
        <Form autoComplete="off" form={form} name="login" layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" name="email" rules={[yupSync]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password" rules={[yupSync]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <CustomSpace isFullWidth justify="space-between">
              <Link to="/forgot">Quên mật khẩu</Link>

              <Link replace to="/signup">
                Chưa có tài khoản?
              </Link>
            </CustomSpace>
          </Form.Item>

          <Form.Item>
            <CustomSpace
              styles={{ item: { textAlign: 'center' } }}
              direction="vertical"
              isFullWidth
            >
              <Button type="primary" block htmlType="submit">
                Đăng nhập
              </Button>
              <Divider>Hoặc</Divider>
              <Button block>Đăng nhập với facebook</Button>
              <Button block>Đăng nhập với gmail</Button>
              <Button block>Đăng nhập bằng mã sinh viên UTC</Button>
            </CustomSpace>
          </Form.Item>
        </Form>
      </CustomCard>
    </CustomSpace>
  );
}
