import { Button, Flex, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CustomCard } from '@/components/CustomCard';
import { useAuth } from '@/features/auth/hooks';
import { createValidator } from '@/utils/validator';
import { logInSchema } from '@/features/auth/schemas/logInSchema';
import type { LoginPayload } from '..';

export default function Login() {
  const { logIn } = useAuth();
  const [form] = Form.useForm();

  const yupSync = createValidator(logInSchema);

  const handleSubmit = (values: LoginPayload) => {
    logIn(values);
  };

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{
        minHeight: '100vh',
      }}
      gap={16}
    >
      <Typography.Title>Đăng Nhập</Typography.Title>
      <CustomCard hasShadow style={{ width: '25%' }}>
        <Form autoComplete="off" form={form} name="login" layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" name="email" rules={[yupSync]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password" rules={[yupSync]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between">
              <Link to="/forgot">Quên mật khẩu</Link>

              <Link replace to="/signup">
                Chưa có tài khoản?
              </Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Flex vertical>
              <Button type="primary" block htmlType="submit">
                Đăng nhập
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </CustomCard>
    </Flex>
  );
}
