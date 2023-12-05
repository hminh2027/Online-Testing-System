import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Drawer } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useToggle } from 'react-use';
import { useListNotification } from '@/features/notification/hooks/useNotification';
import { NotificationList } from './NotificationList';

export function Notification() {
  const { data: notiData } = useListNotification({}, { refetchOnWindowFocus: false });
  const notiList = notiData?.content;
  const [open, toggleDrawer] = useToggle(false);

  return (
    <>
      <Badge count={notiList?.filter((noti) => !noti.isRead).length} overflowCount={99}>
        <Avatar
          onClick={toggleDrawer}
          icon={<FontAwesomeIcon icon={faBell} />}
          shape="circle"
          size="large"
        />
      </Badge>
      <Drawer
        destroyOnClose
        title="Thông báo"
        width="40%"
        closable
        onClose={toggleDrawer}
        open={open}
        placement="left"
        closeIcon={<BellOutlined />}
      >
        <NotificationList toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
}
