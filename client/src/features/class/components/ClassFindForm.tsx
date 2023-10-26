import { Button, Divider, Flex, Form, Image, Input, Typography } from 'antd';
import { CustomCard } from '@/components';
import type { ClassRoom } from '../types';
import type { UserClassCreateDTO } from '@/features/userClass/types';
import { useAddUserClass } from '@/features/userClass/hooks/useUserClass';
import { useAuth } from '@/features/auth';

interface ClassFindFormProps {
  classRoom: ClassRoom;
}
export function ClassFindForm({ classRoom }: ClassFindFormProps) {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { mutate } = useAddUserClass({
    onSuccess: () => {},
    onError: () => {},
  });

  const handleOnFinish = (value: UserClassCreateDTO) => {
    mutate({
      studentId: user?.id as number,
      classCode: classRoom.code,
      password: value.password,
    });
  };

  return (
    <CustomCard>
      <Form form={form} onFinish={handleOnFinish} />
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
            required
            name="password"
            // rules={[
            //   {
            //     message: 'Mật khẩu không đúng',
            //     validator(rule, value) {
            //       console.log(rule, value);
            //     },
            //   },
            // ]}
          >
            <Input.Password placeholder="Lớp học này chứa mật khẩu..." />
          </Form.Item>
        )}
        <Button block type="primary" onClick={() => form.submit()}>
          Gửi yêu cầu
        </Button>
      </Flex>
    </CustomCard>
  );
}
