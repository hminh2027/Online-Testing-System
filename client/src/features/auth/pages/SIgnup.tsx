import { Button, Col, DatePicker, Divider, Flex, Form, Input, Row, Select, Typography } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import { useToggle } from 'react-use';
import { CustomCard } from '@/components/CustomCard';
import { useAuth } from '@/features/auth/hooks';
import { LoginModal } from '../components';
import { signUpSchema } from '../schemas/signUp.schema';
import { createValidator } from '@/utils/validator';
import type { SignUpFormValues } from '..';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';

export default function SignUp() {
  const { signUp } = useAuth();

  const yupSync = createValidator(signUpSchema);

  const [form] = Form.useForm();
  const [open, toggleOpen] = useToggle(false);
  const { notify } = useAntDNoti();

  const handleSubmit = (values: SignUpFormValues) => {
    if (values.password !== values.confirmPassword) {
      notify({
        type: 'error',
        description: 'Mật khẩu không khớp',
      });

      return;
    }

    signUp(values);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    current && current > dayjs().endOf('day');

  return (
    <Flex
      justify="center"
      align="center"
      vertical
      style={{
        minHeight: '100vh',
      }}
      gap={16}
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
          <Flex justify="space-between" gap={24}>
            <div>
              <Divider>Thông tin tài khoản</Divider>
              <Form.Item rules={[yupSync]} required label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item rules={[yupSync]} required label="Mật khẩu" name="password">
                <Input type="password" />
              </Form.Item>
              <Form.Item
                rules={[yupSync]}
                required
                label="Xác nhận mật khẩu"
                name="confirmPassword"
              >
                <Input type="password" />
              </Form.Item>
            </div>
            <div>
              <Divider>Thông tin cá nhân</Divider>
              <Row gutter={10}>
                <Col span={24}>
                  <Form.Item rules={[yupSync]} required label="Họ và tên" name="fullname">
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
            </div>
          </Flex>
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
          <Form.Item>
            <Flex justify="end">
              <Link replace to="/login">
                Đã có tài khoản?
              </Link>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Flex vertical>
              <Button type="primary" block htmlType="submit">
                Đăng ký
              </Button>
              <Divider>Hoặc</Divider>
              <Button type="default" onClick={toggleOpen} block>
                Đăng ký với tư cách sinh viên UTC
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </CustomCard>
      <LoginModal toggleOpen={toggleOpen} open={open} />
    </Flex>
  );
}
