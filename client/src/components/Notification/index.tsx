import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { BadgeProps, MenuProps } from 'antd';
import { Avatar, Badge, Dropdown } from 'antd';
import { useListNotification } from '@/hooks/useNotification';
import queryParams from '@/types/query-params';

const items: MenuProps['items'] = [
  {
    label: 'Thông tin cá nhân',
    key: '0',
  },
  {
    label: 'Đổi mật khẩu',
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Đăng xuất',
    key: '2',
  },
];

interface NotificationProps extends BadgeProps {}
export default function Notification(props: NotificationProps) {
  const { count, ...rest } = props;
  const { data } = useListNotification(queryParams as never);

  console.log(data);

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Badge count={count} overflowCount={10} {...rest}>
        <Avatar
          icon={<FontAwesomeIcon icon={faBell} />}
          shape="circle"
          size="large"
        />
      </Badge>
    </Dropdown>
  );
}
