import { Avatar, Flex, Typography } from 'antd';
import { CustomCard } from '@/components';
import type { Comment } from '../types';
import { formatFromNowTime } from '@/utils';

interface CommentItemProps {
  comment: Comment;
}
export function CommentItem({ comment }: CommentItemProps) {
  return (
    <Flex gap={12}>
      <Avatar>M</Avatar>
      <CustomCard padding={0}>
        <Flex vertical>
          <Typography.Text strong>
            {comment.User.fullname} - {formatFromNowTime(comment.createdAt as Date)}
          </Typography.Text>
          <Typography.Text>{comment.content}</Typography.Text>
        </Flex>
      </CustomCard>
    </Flex>
  );
}
