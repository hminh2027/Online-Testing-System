import {
Button,
Col,
DatePicker,
Form,
Input,
Row,
Select,
} from 'antd';
import { Link } from 'react-router-dom';
import { CustomCard } from '@/components/CustomCard';
import { CustomSpace } from '@/components/CustomSpace';
import { useAuth } from '@/features/auth/hooks';
import type { SignUpPayload } from '..';

export function SignUp() {
  const { signUp } = useAuth();

  const [form] = Form.useForm();

  const handleSubmit = (values: SignUpPayload) => {
    const {
      email,
      password,
      fullname,
      isTeacher,
      birth,
      phone,
      school,
      studentId,
    } = values;

    signUp({
      email,
      password,
      fullname,
      isTeacher,
      birth,
      phone,
      school,
      studentId,
    });
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
      Tạo tài khoản
      <CustomCard hasShadow>
        <Form
          form={form}
          name="signup"
          layout="vertical"
          onFinish={handleSubmit}
        >
          Thông tin tài khoản
          <Form.Item required label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item required label="Mật khẩu" name="password">
            <Input type="password" />
          </Form.Item>
          <Form.Item required label="Xác nhận mật khẩu" name="rePassword">
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Đăng ký với vai trò" name="isTeacher">
            <Select
              defaultValue={false}
              options={[
                {
                  value: false,
                  label: 'Học sinh/sinh viên',
                },
                {
                  value: true,
                  label: 'Giáo viên',
                },
              ]}
            />
          </Form.Item>
          Thông tin cá nhân
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item required label="Họ và tên" name="fullname">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Mã học sinh/sinh viên" name="studentId">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phone">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày sinh" name="birth">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Trường học" name="school">
            <Input />
          </Form.Item>
          <Form.Item>
            <CustomSpace isFullWidth justify="space-between">
              <Link to="/signup">Đã có tài khoản?</Link>
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
            </CustomSpace>
          </Form.Item>
        </Form>
      </CustomCard>
    </CustomSpace>
  );
}
