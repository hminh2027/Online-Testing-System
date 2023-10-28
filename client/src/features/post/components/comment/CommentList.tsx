import { Flex } from 'antd';
import type { Comment } from '../../types';
import { CommentItem } from './CommentItem';

interface CommentListProps {
  comments: Comment[];
}
export function CommentList({ comments }: CommentListProps) {
  return (
    <Flex vertical gap={12}>
      {comments.map((item) => (
        <CommentItem key={item.id} comment={item} />
      ))}
    </Flex>
  );
}
