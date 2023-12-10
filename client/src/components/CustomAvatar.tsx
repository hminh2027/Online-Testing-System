import type { AvatarProps as AntAvatarProps } from 'antd';
import { Avatar as AntAvatar } from 'antd';
import { FileTextOutlined, FormOutlined, TeamOutlined } from '@ant-design/icons';
import type { CSSProperties, ReactElement } from 'react';
import type { NotificationTypeKey } from '@/features/notification';

interface CustomAvatarAvatarProps extends AntAvatarProps {
  name?: string;
  pointer?: boolean;
  subIconType?: NotificationTypeKey;
}

export function CustomAvatar(props: CustomAvatarAvatarProps) {
  const { name, pointer = false, style, subIconType, ...rest } = props;

  const initials = (): string | null => {
    const trimmedName = name && name.trim();

    if (!trimmedName) return null;
    const nameArray = trimmedName.split(' ');

    if (nameArray.length === 1) return nameArray[0].charAt(0).toUpperCase();

    const [firstChar, lastChar] = [nameArray[0].charAt(0), nameArray[1].charAt(0)];

    return (firstChar + lastChar).toUpperCase();
  };

  const getSubIconBg = (type: NotificationTypeKey): CSSProperties['backgroundColor'] => {
    switch (type) {
      case 'class':
        return '#cd4236';

      case 'post':
        return '#1c375b';

      case 'exam':
        return '#4172b3';

      default:
        return 'initial';
    }
  };

  const getSubIcon = (type: NotificationTypeKey): ReactElement | null => {
    switch (type) {
      case 'class':
        return <TeamOutlined />;

      case 'post':
        return <FormOutlined />;

      case 'exam':
        return <FileTextOutlined />;

      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <AntAvatar
        shape="circle"
        alt={name}
        {...rest}
        style={{
          cursor: pointer ? 'pointer' : 'initial',
          ...style,
        }}
      >
        {initials()}
      </AntAvatar>
      {subIconType && (
        <AntAvatar
          size="small"
          style={{
            position: 'absolute',
            left: '100%',
            top: '100%',
            backgroundColor: getSubIconBg(subIconType),
            translate: '-75% -75%',
          }}
        >
          {getSubIcon(subIconType)}
        </AntAvatar>
      )}
    </div>
  );
}
