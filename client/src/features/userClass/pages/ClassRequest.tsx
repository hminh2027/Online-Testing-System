import { Button, Divider, List } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useListUserClass } from '../hooks/useUserClass';
import { useAuth } from '@/features/auth';
import { formatISOToVi } from '@/utils';
import { useUserClassMutation } from '../hooks/useUserClassMutation';
import { LoadingModal } from '@/components';
import { useNotificationMutation } from '@/features/notification/hooks/useNotificationMutation';
import type { UserClass } from '../types';

export default function ClassRequest() {
  const { user } = useAuth();
  const { data, isLoading } = useListUserClass({ studentId: user?.id });
  const { patchFn, deleteFn } = useUserClassMutation();
  const { addFn: addNotiFn } = useNotificationMutation();

  const requests = data?.content.filter((req) => req.isPending && !req.isStudentRequested);

  if (isLoading) return <LoadingModal />;

  const handleAccept = ({ id, Class: { teacherId, name }, classCode }: UserClass) => {
    patchFn({
      id: id as number,
      payload: {},
    });
    addNotiFn({
      notiType: 'class',
      recipents: [teacherId],
      content: `Học sinh ${user?.fullname} đã nhận lời tham gia lớp học ${name}`,
      url: `/class/${classCode}`,
    });
  };

  const handleDecline = ({ id, Class: { teacherId, name } }: UserClass) => {
    deleteFn({ id: id as number });
    addNotiFn({
      notiType: 'class',
      recipents: [teacherId],
      content: `Học sinh ${user?.fullname} đã từ chối tham gia lớp học ${name}`,
    });
  };

  return (
    <>
      <Divider orientation="left">Lời mời vào lớp học</Divider>
      <List
        className="user-class-list"
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={requests}
        bordered
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={() => handleAccept(item)}
                icon={<CheckCircleOutlined />}
                type="primary"
                key={1}
              >
                Chấp nhận
              </Button>,
              <Button
                onClick={() => handleDecline(item)}
                icon={<CloseCircleOutlined />}
                danger
                key={2}
              >
                Từ chối
              </Button>,
            ]}
          >
            <List.Item.Meta
              style={{ alignItems: 'center' }}
              title={`${item.Class.name} - Giáo viên: ${item.Class.User.fullname}`}
              description={`Mời lúc: ${formatISOToVi(item.createdAt as Date)}`}
            />
          </List.Item>
        )}
      />
    </>
  );
}
