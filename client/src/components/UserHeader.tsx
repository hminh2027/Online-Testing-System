import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth';

interface UserHeaderProps {
  username?: string;
}

export function UserHeader({ username }: UserHeaderProps) {
  const { logOut } = useAuth();
  const { user } = useAuth();

  const initials = (): string | null => {
    const trimmedName = username && username.trim();

    if (!trimmedName) return null;
    const nameArray = trimmedName.split(' ');

    if (nameArray.length === 1) return nameArray[0].charAt(0).toUpperCase();

    const [firstChar, lastChar] = [nameArray[0].charAt(0), nameArray[1].charAt(0)];

    return (firstChar + lastChar).toUpperCase();
  };

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
      <Avatar src={user?.imageUrl} shape="circle" size="large">
        {initials()}
      </Avatar>
    </Dropdown>
  );
}
