import { Flex, Typography } from 'antd';
import { CustomCard } from '@/components';
import type { Comment } from '../../types';
import { formatFromNowTime } from '@/utils';
import { CustomAvatar } from '@/components/CustomAvatar';

interface CommentItemProps {
  comment: Comment;
}
export function CommentItem({ comment }: CommentItemProps) {
  return (
    <Flex gap={12}>
      <CustomAvatar name={comment.User.fullname} />
      <CustomCard padding={0} style={{ maxWidth: '80%' }}>
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
