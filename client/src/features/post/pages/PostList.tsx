import { ClassDetailLayout } from '@/layouts';
import PostCreateForm from '../components/PostCreateForm';
import PostInfiniteList from '../components/PostInfiniteList';

export default function PostList() {
  // TODO: nên tạo layout riêng
  return (
    <ClassDetailLayout>
      <PostCreateForm />
      <PostInfiniteList />
    </ClassDetailLayout>
  );
}
