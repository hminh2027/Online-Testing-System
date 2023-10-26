import { Flex, Form, Input } from 'antd';
import { useAddComment } from '../hooks/useComment';
import type { CommentCreateDTO } from '../types';
import { CustomAvatar } from '@/components/CustomAvatar';
import { useAuth } from '@/features/auth';

interface CommentCreateFormProps {
  postId: number;
}
export function CommentCreateForm({ postId }: CommentCreateFormProps) {
  const { mutate } = useAddComment({
    onSuccess: () => {},
    onError: () => {},
  });

  const { user } = useAuth();

  const handleOnFinish = (value: CommentCreateDTO) => {
    mutate({
      content: value.content,
      postId,
    });
  };

  return (
    <Form onFinish={handleOnFinish}>
      <Form.Item name="content">
        <Flex justify="space-between" gap={15}>
          <CustomAvatar name={user?.fullname} />
          <Input placeholder="Viết bình luận..." />
        </Flex>
      </Form.Item>
    </Form>
  );
}
