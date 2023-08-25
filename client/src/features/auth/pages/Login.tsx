import { Button, Divider, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { CustomCard } from '@/components/CustomCard';
import { CustomSpace } from '@/components/CustomSpace';

export function Login() {
  return (
    <div
      style={{
        width: '50%',
        margin: 'auto',
      }}
    >
      Đăng nhập
      <CustomCard hasShadow>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={() => {}}
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
              <Button type="primary" block>
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
    </div>
  );
}
