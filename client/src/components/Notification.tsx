import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Dropdown } from 'antd';
import { useListNotification } from '@/features/notification/hooks/useNotification';
import { LoadingModal } from './LoadingModal';

export function Notification() {
  const { data, isFetching } = useListNotification({});

  const notiList = data?.content;

  if (isFetching) return <LoadingModal />;

  return (
    <Dropdown trigger={['click']}>
      <Badge count={notiList?.length} overflowCount={99}>
        <Avatar icon={<FontAwesomeIcon icon={faBell} />} shape="circle" size="large" />
      </Badge>
    </Dropdown>
  );
}
