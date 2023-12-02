import { Flex, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useListUserClass } from '../hooks/useUserClass';
import { RequestCard } from './RequestCard';

export function RequestList() {
  const { code } = useParams();
  const { data } = useListUserClass({ classCode: code });

  const users = data?.content;

  const requests = users?.filter((user) => user.isPending && user.isStudentRequested);

  return (
    <Flex gap={12} vertical>
      <Typography.Text strong>Chờ duyệt - {requests?.length}</Typography.Text>
      {requests?.map((req) => <RequestCard request={req} key={req.id} />)}
    </Flex>
  );
}
