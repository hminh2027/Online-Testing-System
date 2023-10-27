import { Button, Flex, Space, Typography } from 'antd';
import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import { CustomCard } from '@/components';
import { CustomAvatar } from '@/components/CustomAvatar';
import type { UserClass } from '../types';
import { formatFromNowTime } from '@/utils';

interface RequestCardProps {
  request: UserClass;
}
export function RequestCard({ request }: RequestCardProps) {
  return (
    <CustomCard bodyStyle={{ padding: 12 }}>
      <Flex gap={12} justify="space-between">
        <Space size="middle">
          <CustomAvatar name={request.User.fullname} />
          <Flex vertical justify="space-around">
            <Typography.Text strong ellipsis={true}>
              {request.User.fullname}
            </Typography.Text>
            <Typography.Text>{formatFromNowTime(request.createdAt as Date)}</Typography.Text>
          </Flex>
        </Space>

        <Space>
          <Button type="primary" ghost icon={<CheckOutlined />} />
          <Button danger icon={<StopOutlined />} />
        </Space>
      </Flex>
    </CustomCard>
  );
}
