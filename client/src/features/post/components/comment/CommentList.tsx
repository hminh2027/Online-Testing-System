import { Flex } from 'antd';
import { CommentItem } from './CommentItem';
import { useListComment } from '../../hooks/useComment';

interface CommentListProps {
  postId: number;
}
export function CommentList({ postId }: CommentListProps) {
  const { data, isFetching } = useListComment({ postId });

  const comments = data?.content;

  if (isFetching) return <span/>;

  return (
    <Flex vertical gap={12}>
      {comments?.map((item) => (
        <CommentItem key={item.id} comment={item} />
      ))}
    </Flex>
  );
}
