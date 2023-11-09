import { Button, Flex, Space, Typography } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import { CustomCard } from '@/components';
import { CustomAvatar } from '@/components/CustomAvatar';
import type { UserClass } from '../types';
import { formatISOFromNowTime } from '@/utils';
import { useDeleteUserClass, usePatchUserClass } from '../hooks/useUserClass';

interface RequestCardProps {
  request: UserClass;
}
export function RequestCard({ request }: RequestCardProps) {
  const { mutate: patchFn } = usePatchUserClass({
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: deleteFn } = useDeleteUserClass({
    onSuccess: () => {},
    onError: () => {},
  });

  const handleApprove = () => {
    patchFn({
      id: request.id as number,
      payload: {},
    });
  };

  const handleReject = () => {
    deleteFn({ id: request.id as number });
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
