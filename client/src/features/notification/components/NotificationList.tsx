import { Button, Dropdown, List } from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { useListNotification } from '..';
import { CustomAvatar } from '@/components';
import { formatISOFromNowTime, genDropdownItems } from '@/utils';
import { useNotificationMutation } from '../hooks/useNotificationMutation';

interface NotificationListProps {
  toggleDrawer: (value: boolean) => void;
}
export function NotificationList({ toggleDrawer }: NotificationListProps) {
  const { data: notiData } = useListNotification({}, { refetchOnWindowFocus: false });
  const notiList = notiData?.content;
  const { patchFn, deleteFn } = useNotificationMutation();

  const handleNotiClick = (id: number) => {
    patchFn({
      id,
      payload: { isRead: true },
    });

    toggleDrawer(false);
  };

  const handleUnmark = (id: number) =>
    patchFn({
      id,
      payload: { isRead: false },
    });

  return (
    <List
      size="large"
      dataSource={notiList}
      renderItem={({ Notification: item, isRead, id }) => (
        <List.Item
          style={{
            backgroundColor: isRead ? 'white' : '#f4f9fe',
            borderRadius: 8,
            padding: '1rem',
            margin: '0.2rem 0',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
          }}
          extra={
            <Dropdown
              menu={{
                items: genDropdownItems({
                  unmark: () => handleUnmark(id as number),
                  delete: () => deleteFn({ id: id as number }),
                }),
              }}
              trigger={['click']}
            >
              <Button icon={<DownOutlined />}>Nhấp</Button>
            </Dropdown>
          }
        >
          <Link
            onClick={() => handleNotiClick(id as number)}
            style={{ width: '100%' }}
            to={item.url}
          >
            <List.Item.Meta
              style={{
                alignItems: 'center',
              }}
              avatar={
                <CustomAvatar
                  shape="square"
                  size="large"
                  name={item.User.fullname}
                  src={item.User.imageUrl}
                />
              }
              title={item.content}
              description={item.createdAt && formatISOFromNowTime(item.createdAt)}
            />
          </Link>
        </List.Item>
      )}
    />
  );
}
