import { Button, Col, DatePicker, Divider, Flex, Form, Input, Row, Select, Typography } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import { useToggle } from 'react-use';
import { CustomCard } from '@/components/CustomCard';
import { useAuth } from '@/features/auth/hooks';
import type { SignUpPayload } from '..';
import { signUpSchema } from '../schemas/signUpSchema';
import { createValidator } from '@/utils/validator';
import { LoginModal } from '../components';

export default function SignUp() {
  const { signUp } = useAuth();
  const [isModalOpen, toggleModal] = useToggle(false);

  const yupSync = createValidator(signUpSchema);

  const [form] = Form.useForm();

  const handleSubmit = (values: SignUpPayload) => {
    signUp(values);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    current && current > dayjs().endOf('day');

  return (
    <>
      <LoginModal isModalOpen={isModalOpen} />
      <Flex
        justify="center"
        align="center"
        vertical
        style={{
          minHeight: '100vh',
        }}
      >
        <Typography.Title>Tạo Tài Khoản</Typography.Title>
        <CustomCard hasShadow>
          <Form
            autoComplete="off"
            form={form}
            name="signup"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Divider orientation="left">Thông tin tài khoản</Divider>
            <Form.Item rules={[yupSync]} required label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item rules={[yupSync]} required label="Mật khẩu" name="password">
              <Input type="password" />
            </Form.Item>
            <Form.Item rules={[yupSync]} required label="Xác nhận mật khẩu" name="confirmPassword">
              <Input type="password" />
            </Form.Item>
            <Form.Item initialValue={false} label="Đăng ký với vai trò" name="isTeacher">
              <Select
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
            <Divider orientation="left">Thông tin cá nhân</Divider>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item rules={[yupSync]} required label="Họ và tên" name="fullname">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item rules={[yupSync]} label="Mã học sinh/sinh viên" name="studentId">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item rules={[yupSync]} label="Số điện thoại" name="phone">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item rules={[yupSync]} label="Ngày sinh" name="birth">
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{
                      width: '100%',
                    }}
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item rules={[yupSync]} label="Trường học" name="school">
              <Input />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between">
                <Link replace to="/login">
                  Đã có tài khoản?
                </Link>
                <Button type="link" onClick={toggleModal}>
                  Là sinh viên UTC?
                </Button>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Flex vertical>
                <Button type="primary" block htmlType="submit">
                  Đăng ký
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </CustomCard>
      </Flex>
    </>
  );
}
