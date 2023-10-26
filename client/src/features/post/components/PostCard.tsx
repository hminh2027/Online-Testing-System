import { Button, Divider, Flex, Image, Space, Typography } from 'antd';

import { useToggle } from 'react-use';
import { CustomCard } from '@/components';
import type { Post } from '../types';
import { CommentCreateForm } from '@/features/comment/components/CommentCreateForm';
import { CommentList } from '@/features/comment/components/CommentList';
import { formatFromNowTime } from '@/utils';
import { CustomAvatar } from '@/components/CustomAvatar';

interface PostCardProps extends Post {}
export function PostCard(props: PostCardProps) {
  const { User, Comment, createdAt, id, content, imageUrl } = props;

  const { fullname } = User;

  const [openComment, toggleOpen] = useToggle(true);

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
            <CustomAvatar size="large" name={fullname} />
            <Flex vertical justify="space-between">
              <Typography.Text strong>{fullname}</Typography.Text>
              <Typography.Text>{formatFromNowTime(createdAt as Date)}</Typography.Text>
            </Flex>
          </Space>
          ...
        </Flex>
        {/* content */}
        <Flex vertical gap={6}>
          <Typography.Text>{content}</Typography.Text>
          {imageUrl && (
            <Image loading="lazy" style={{ borderRadius: 8 }} width="100%" src={imageUrl} />
          )}
        </Flex>
        {/* comment footer */}
        <Divider />
        <Flex justify="space-between" align="center">
          <Typography.Text>{Comment.length} bình luận</Typography.Text>
          <Button onClick={toggleOpen} type="link">
            Ẩn bình luận
          </Button>
        </Flex>
        <CommentCreateForm postId={id as number} />
        {openComment && <CommentList comments={Comment} />}
      </Flex>
    </CustomCard>
  );
}
