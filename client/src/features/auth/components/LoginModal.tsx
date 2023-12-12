import { Button, Form, Input, Modal } from 'antd';
import useUtcLogin from '../hooks/useUtcLogin';

export interface LoginUtcPayload {
  studentId: string;
  password: string;
}

// 192610058 - 08/11/2001

interface LoginModalProps {
  open: boolean;
  toggleOpen: () => void;
}
export function LoginModal({ open, toggleOpen }: LoginModalProps) {
  const [utcForm] = Form.useForm();
  const { logInUtc } = useUtcLogin();

  const handleSubmit = (values: LoginUtcPayload) => {
    logInUtc(values);
  };

  return (
    <Modal
      onCancel={toggleOpen}
      centered
      footer={null}
      destroyOnClose
      closable
      title="Đăng Ký cho Sinh Viên UTC"
      open={open}
    >
      <Form
        autoComplete="off"
        form={utcForm}
        name="utc-login"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Mã sinh viên" name="username" required>
          <Input />
        </Form.Item>
        <Form.Item label="Mật khẩu" name="password" required>
          <Input type="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
