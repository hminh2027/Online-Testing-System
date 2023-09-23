import { Button, Divider, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { CustomCard } from '@/components/CustomCard';
import { CustomSpace } from '@/components/CustomSpace';
import { useAuth } from '@/features/auth/hooks';

interface Credentials {
  email: string;
  password: string;
}

export function Login() {
  // const { logIn } = useAuth();
  // const { data, mutate } = logIn();

  const { login } = useAuth();

  const [form] = Form.useForm();

  const handleSubmit = (values: Credentials) => {
    console.log(values);

    const { email, password } = values;

    login(email, password);
    // mutate(values);
    // const data = await request({
    //   url: 'student',
    //   options: {
    //     method: 'POST',
    //     baseURL: 'http://localhost:5000',
    //     data: {
    //       username: values.email,
    //       password: values.password,
    //     },
    //   },
    // });

    // console.log(data);
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
      }}
    >
      Đăng nhập
      <CustomCard hasShadow>
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password">
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <CustomSpace isFullWidth justify="space-between">
              <Link to="/forgot">Quên mật khẩu?</Link>

              <Link to="/signup">Chưa có tài khoản?</Link>
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
