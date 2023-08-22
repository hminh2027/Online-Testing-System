import type { MenuProps } from 'antd';
import { Avatar, Dropdown } from 'antd';

interface UserHeaderProps {
  username?: string;
}

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

export default function UserHeader({ username }: UserHeaderProps) {
  const initials = (): string | null => {
    const trimmedName = username && username.trim();

    if (!trimmedName) return null;
    const nameArray = trimmedName.split(' ');

    if (nameArray.length === 1) return nameArray[0].charAt(0).toUpperCase();

    const [firstChar, lastChar] = [
      nameArray[0].charAt(0),
      nameArray[1].charAt(0),
    ];

    return (firstChar + lastChar).toUpperCase();
  };

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Avatar>{initials()}</Avatar>
    </Dropdown>
  );
}
