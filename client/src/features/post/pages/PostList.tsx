import { Flex } from 'antd';
import { PostCreateForm, PostInfiniteList } from '../components';

export default function PostList() {
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
      <PostCreateForm />
      <PostInfiniteList />
    </Flex>
  );
}
