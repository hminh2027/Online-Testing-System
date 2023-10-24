import { Flex } from 'antd';
import { PostCreateForm, PostInfiniteList } from '../components';

export default function PostList() {
  return (
    <Flex
      align="center"
      justify="center"
      vertical
      style={{
        width: '40%',
        margin: 'auto',
      }}
    >
      <PostCreateForm />
      <PostInfiniteList />
    </Flex>
  );
}
