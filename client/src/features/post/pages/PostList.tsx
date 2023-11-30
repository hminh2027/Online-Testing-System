import { Flex, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { PostCreateForm, PostInfiniteList } from '../components';
import { useAuth } from '@/features/auth';
import { useClass } from '@/features/class/hooks/useClass';

export default function PostList() {
  const { user } = useAuth();
  const { code } = useParams();
  const { data } = useClass(code as string);
  const classRoom = data?.content;

  return (
    <Flex
      gap={14}
      align="center"
      justify="center"
      vertical
      style={{
        width: '40%',
        margin: 'auto',
        overflow: 'auto',
      }}
    >
      {!classRoom?.isStudentPostAllowed && !user?.isTeacher ? (
        <Typography.Text type="danger">Giáo viên đã tắt quyền đăng bài</Typography.Text>
      ) : (
        <PostCreateForm />
      )}
      <PostInfiniteList />
    </Flex>
  );
}
