import { Button, Flex, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useListUserClass } from '../hooks/useUserClass';
import { RequestCard } from './RequestCard';

export function RequestList() {
  const { code } = useParams();
  const { data } = useListUserClass({ classCode: code });

  const users = data?.content;

  const requests = users?.filter((user) => user.isPending);

  return (
    <Flex gap={12} vertical>
      <Typography.Text strong>Chờ duyệt - {requests?.length}</Typography.Text>
      <Button disabled={requests?.length === 0} type="primary">
        Phê duyệt tất cả
      </Button>
      <Button disabled={requests?.length === 0} danger>
        Từ chối tất cả
      </Button>

      {requests?.map((req) => <RequestCard request={req} key={req.id} />)}
    </Flex>
  );
}
