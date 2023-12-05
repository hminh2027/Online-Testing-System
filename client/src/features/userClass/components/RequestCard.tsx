import { Button, Flex, Space, Typography } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import { CustomCard } from '@/components';
import { CustomAvatar } from '@/components/CustomAvatar';
import type { UserClass } from '../types';
import { formatISOFromNowTime } from '@/utils';
import { useUserClassMutation } from '../hooks/useUserClassMutation';
import { useNotificationMutation } from '@/features/notification/hooks/useNotificationMutation';
import { useAuth } from '@/features/auth';

interface RequestCardProps {
  request: UserClass;
}
export function RequestCard({ request }: RequestCardProps) {
  const { patchFn, deleteFn } = useUserClassMutation();
  const { addFn: addNotiFn } = useNotificationMutation();
  const { user } = useAuth();

  const handleApprove = () => {
    patchFn({
      id: request.id as number,
      payload: {},
    });
    addNotiFn({
      notiType: 'class',
      recipents: [request.studentId],
      content: `Giáo viên ${user?.fullname} đã chấp thuận yêu cầu tham gia vào lớp học ${request.Class.name} của bạn`,
      url: `/class/${request.classCode}`,
    });
  };

  const handleReject = () => {
    deleteFn({ id: request.id as number });
    addNotiFn({
      notiType: 'class',
      recipents: [request.studentId],
      content: `Giáo viên ${user?.fullname} đã từ chối yêu cầu tham gia vào lớp học ${request.Class.name} của bạn`,
    });
  };

  return (
    <CustomCard bodyStyle={{ padding: 12 }}>
      <Flex gap={12} justify="space-between">
        <Space size="middle">
          <CustomAvatar name={request.User.fullname} />
          <Flex vertical justify="space-around">
            <Typography.Text strong ellipsis={true}>
              {request.User.fullname}
            </Typography.Text>
            <Typography.Text>{formatISOFromNowTime(request.createdAt as Date)}</Typography.Text>
          </Flex>
        </Space>

        <Space>
          <Button onClick={handleApprove} type="primary" ghost icon={<CheckOutlined />} />
          <Button onClick={handleReject} danger icon={<StopOutlined />} />
        </Space>
      </Flex>
    </CustomCard>
  );
}
