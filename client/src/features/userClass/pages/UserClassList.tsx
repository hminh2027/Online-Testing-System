import { useParams } from 'react-router-dom';
import { useListUserClass } from '../hooks/useUserClass';
import { UserClassTable } from '../components/Table';

export default function UserClassList() {
  const { code } = useParams();
  const { data, isLoading } = useListUserClass({ classCode: code });

  const requests = data?.content.filter((req) => !req.isPending);

  if (isLoading) return <>Loading</>;

  return <UserClassTable dataSource={requests} />;
}
