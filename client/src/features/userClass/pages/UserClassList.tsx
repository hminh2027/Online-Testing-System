import { REQUEST_STATUS } from '@/constants';
import { useListUserClass } from '../hooks/useUserClass';

export function UserClassList() {
  const { data: pd } = useListUserClass({
    classCode: '02FEA7',
    status: REQUEST_STATUS.PENDING,
  });

  const { data: ac } = useListUserClass({
    classCode: '02FEA7',
    status: REQUEST_STATUS.ACCEPTED,
  });

  console.log(pd, ac);

  return <div>UserClassList</div>;
}
