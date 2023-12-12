import { Dropdown, type MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { CustomAvatar } from './CustomAvatar';

interface UserHeaderProps {
  username?: string;
}

export function UserHeader({ username }: UserHeaderProps) {
  const { logOut } = useAuth();
  const { user } = useAuth();

  const items: MenuProps['items'] = [
    {
      label: <Link to="/profile/me">Thông tin cá nhân</Link>,
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
      onClick: logOut,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <CustomAvatar name={username} src={user?.imageUrl} shape="circle" size="large" />
    </Dropdown>
  );
}
