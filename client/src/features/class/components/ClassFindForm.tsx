import { Button, Divider, Flex, Form, Image, Input, Typography } from 'antd';
import { CustomCard } from '@/components';
import type { ClassRoom } from '../types';
import type { UserClassCreateDTO } from '@/features/userClass/types';
import { useAuth } from '@/features/auth';
import { useUserClassMutation } from '@/features/userClass/hooks/useUserClassMutation';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';
import { useNotificationMutation } from '@/features/notification/hooks/useNotificationMutation';

interface ClassFindFormProps {
  classRoom: ClassRoom;
  toggleModal: (value: boolean) => void;
}
export function ClassFindForm({ classRoom, toggleModal }: ClassFindFormProps) {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const { addFn: addUCFn } = useUserClassMutation();
  const { notify } = useAntDNoti();
  const { addFn: addNotiFn } = useNotificationMutation();

  const handleOnFinish = (value: UserClassCreateDTO) => {
    if (classRoom.password && value.password !== classRoom.password) {
      notify({
        type: 'error',
        description: 'Sai mật khẩu lớp học',
      });

      return;
    }

    addUCFn({
      studentId: user?.id as number,
      classCode: classRoom.code,
      password: value.password,
      isStudentRequested: true,
    });

    addNotiFn({
      content: `Học sinh ${user?.fullname} gửi yêu cầu vào lớp ${classRoom.name} của bạn`,
      recipents: [classRoom.teacherId],
      url: `/class/${classRoom.code}`,
      notiType: 'class',
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
