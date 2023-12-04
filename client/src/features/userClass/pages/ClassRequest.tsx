import { Button, Divider, List } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useListUserClass } from '../hooks/useUserClass';
import { useAuth } from '@/features/auth';
import { formatISOToVi } from '@/utils';
import { useUserClassMutation } from '../hooks/useUserClassMutation';
import { LoadingModal } from '@/components';

export default function ClassRequest() {
  const { user } = useAuth();
  const { data, isLoading } = useListUserClass({ studentId: user?.id });
  const { patchFn, deleteFn } = useUserClassMutation();

  const requests = data?.content.filter((req) => req.isPending);

  if (isLoading) return <LoadingModal />;

  const handleAccept = (id: number) =>
    patchFn({
      id,
      payload: {},
    });

  const handleDecline = (id: number) => deleteFn({ id });

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
                onClick={() => handleAccept(item.id as number)}
                icon={<CheckCircleOutlined />}
                type="primary"
                key={1}
              >
                Chấp nhận
              </Button>,
              <Button
                onClick={() => handleDecline(item.id as number)}
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
