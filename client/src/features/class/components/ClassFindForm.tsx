import { Button, Divider, Flex, Form, Image, Input, Typography } from 'antd';
import { CustomCard, CustomMessage } from '@/components';
import type { ClassRoom } from '../types';
import type { UserClassCreateDTO } from '@/features/userClass/types';
import { useAuth } from '@/features/auth';
import { useUserClassMutation } from '@/features/userClass/hooks/useUserClassMutation';

interface ClassFindFormProps {
  classRoom: ClassRoom;
  toggleModal: (value: boolean) => void;
}
export function ClassFindForm({ classRoom, toggleModal }: ClassFindFormProps) {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { addFn } = useUserClassMutation();

  const handleOnFinish = (value: UserClassCreateDTO) => {
    if (classRoom.password && value.password !== classRoom.password) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.error('Sai mật khẩu lớp học');

      return;
    }

    addFn({
      studentId: user?.id as number,
      classCode: classRoom.code,
      password: value.password,
      isStudentRequested: true,
    });

    toggleModal(false);
  };

  return (
    <CustomCard>
      <Form name="find-form" form={form} onFinish={handleOnFinish}>
        <Flex gap={12} vertical justify="center" align="center">
          <Image src={classRoom.imageUrl} />
          <Typography.Title level={5}>{classRoom.name}</Typography.Title>
          <Divider />
          <Flex style={{ width: '100%' }} justify="space-between">
            <Typography.Text>Giáo viên:</Typography.Text>
            <Typography.Text>{classRoom.User.fullname}</Typography.Text>
          </Flex>
          {classRoom.password && (
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền mật khẩu!',
                },
              ]}
            >
              <Input.Password placeholder="Lớp học này chứa mật khẩu..." />
            </Form.Item>
          )}
          <Button htmlType="submit" block type="primary">
            Gửi yêu cầu
          </Button>
        </Flex>
      </Form>
    </CustomCard>
  );
}
