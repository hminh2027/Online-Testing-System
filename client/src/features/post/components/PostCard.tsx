import { Button, Divider, Dropdown, Flex, Image, Modal, Space, Typography } from 'antd';

import { useToggle } from 'react-use';
import { EllipsisOutlined } from '@ant-design/icons';
import { CustomCard } from '@/components';
import type { Post } from '../types';
import { CommentCreateForm } from '@/features/post/components/comment/CommentCreateForm';
import { CommentList } from '@/features/post/components/comment/CommentList';
import { formatISOFromNowTime, genDropdownItems } from '@/utils';
import { CustomAvatar } from '@/components/CustomAvatar';
import { useAuth } from '@/features/auth';
import { usePostMutation } from '../hooks/usePostMutation';
import { PostModifier } from './PostModifier';

interface PostCardProps extends Post {}
export function PostCard(props: PostCardProps) {
  const { User, Comment, createdAt, id, content, imageUrl } = props;
  const { user } = useAuth();

  const { fullname } = User;

  const [openComment, toggleComment] = useToggle(true);

  const { deleteFn } = usePostMutation();
  const [isOpen, toggleOpen] = useToggle(false);

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
              <Typography.Text>{formatISOFromNowTime(createdAt as Date)}</Typography.Text>
            </Flex>
          </Space>
          {user?.fullname === User.fullname && (
            <Dropdown
              key="menu"
              menu={{
                items: genDropdownItems({
                  modify: toggleOpen,
                  delete: () => id && deleteFn({ id: +id }),
                }),
              }}
              trigger={['click']}
            >
              <Button type="text" icon={<EllipsisOutlined />} />
            </Dropdown>
          )}
        </Flex>
        {/* content */}
        <Flex vertical gap={6}>
          <Typography.Text>{content}</Typography.Text>
          {imageUrl && (
            <Image loading="lazy" style={{ borderRadius: 2 }} width="100%" src={imageUrl} />
          )}
        </Flex>
        {/* comment footer */}
        <Divider />
        <Flex justify="space-between" align="center">
          <Typography.Text>{Comment.length} bình luận</Typography.Text>
          <Button onClick={toggleComment} type="link">
            Ẩn bình luận
          </Button>
        </Flex>
        <CommentCreateForm postId={id as number} />
        {openComment && <CommentList postId={id as number} />}
      </Flex>

      <Modal
        destroyOnClose
        open={isOpen}
        onCancel={toggleOpen}
        title="Chỉnh sửa bài viết"
        footer={null}
      >
        <PostModifier imageUrl={imageUrl ?? ''} id={id as number} content={content} />
      </Modal>
    </CustomCard>
  );
}
