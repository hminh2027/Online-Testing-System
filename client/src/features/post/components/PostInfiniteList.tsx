import { List } from 'antd';
import { useEffect } from 'react';
import VirtualList from 'rc-virtual-list';
import { useParams } from 'react-router-dom';
import { useListPost } from '../hooks/usePost';
import type { Post } from '../types';
import { PostCard } from './PostCard';

const HEIGHT = 1000;

export function PostInfiniteList() {
  const { code } = useParams();

  const { data, isFetching } = useListPost({ classCode: code });

  const posts = data?.content;

  const appendData = () => {
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData(data.concat(body.results));
    //     message.success(`${body.results.length} more items loaded!`);
    //   });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === HEIGHT) appendData();
  };

  if (isFetching || !posts) return <></>;

  return (
    <List style={{ width: '100%' }}>
      <VirtualList data={posts} itemKey="id" onScroll={onScroll}>
        {(item: Post) => (
          <List.Item key={item.id}>
            <PostCard {...item} />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
