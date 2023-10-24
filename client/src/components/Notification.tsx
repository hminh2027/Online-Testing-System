import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { BadgeProps, MenuProps } from 'antd';
import { Avatar, Badge, Dropdown } from 'antd';
// import { useQueryParams } from 'use-query-params';
import { useListNotification } from '@/features/notification/hooks/useNotification';

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
export function Notification(props: NotificationProps) {
  const { count, ...rest } = props;
  // const [queryParams, _setQueryParams] = useQueryParams();
  // const { data } = useListNotification(queryParams as never);

  // console.log(data);

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
