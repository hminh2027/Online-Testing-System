import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Drawer, Dropdown } from 'antd';
import { useToggle } from 'react-use';
import { useListNotification } from '@/features/notification/hooks/useNotification';
import { LoadingModal } from './LoadingModal';

export function Notification() {
  const { data, isFetching } = useListNotification({});
  const [open, toggleOpen] = useToggle(false);

  const notiList = data?.content;

  if (isFetching) return <LoadingModal />;

  return (
    <>
      <Badge count={notiList?.length} overflowCount={99}>
        <Avatar
          onClick={toggleOpen}
          icon={<FontAwesomeIcon icon={faBell} />}
          shape="circle"
          size="large"
        />
      </Badge>
      <Drawer title="Multi-level drawer" width={520} closable onClose={toggleOpen} open={open}>
        hello
      </Drawer>
    </>
  );
}
