import { Avatar, Button, Flex, Image, Space, Typography } from 'antd';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { CustomCard } from '@/components';
import type { Post } from '../types';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);

interface PostCardProps extends Post {}
export function PostCard(props: PostCardProps) {
  const { User, createdAt } = props;

  const { fullname, imageUrl } = User;

  return (
    <CustomCard
      hasShadow
      style={{
        width: '100%',
      }}
    >
      <Flex vertical gap={14}>
        {/* avatar header */}
        <Flex justify="space-between">
          <Space>
            <Avatar size="large">M</Avatar>
            <Flex vertical justify="space-between">
              <Typography.Text strong>{fullname}</Typography.Text>
              <Typography.Text>{dayjs(createdAt).locale('vi').fromNow()}</Typography.Text>
            </Flex>
          </Space>
          ...
        </Flex>
        {/* content */}
        <Flex vertical>
          <Typography.Text>smoothe</Typography.Text>
          <Image
            style={{ borderRadius: 8 }}
            width="100%"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Flex>
        {/* comment footer */}
        <Flex justify="space-between">
          1comment
          <Button type="text">Ẩn bình luận</Button>
        </Flex>
      </Flex>
    </CustomCard>
  );
}
