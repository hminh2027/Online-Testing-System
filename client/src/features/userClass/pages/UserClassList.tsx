import { useListUserClass } from '../hooks/useUserClass';

export function UserClassList() {
  const { data } = useListUserClass({});

  const users = data?.content;

  console.log(data);

  const pendingUsers = users?.filter((user) => user.isPending);

  console.log(pendingUsers);

  return <div>UserClassList</div>;
}
