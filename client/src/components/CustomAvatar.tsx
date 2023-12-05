import type { AvatarProps as AntAvatarProps } from 'antd';
import { Avatar as AntAvatar } from 'antd';

interface CustomAvatarAvatarProps extends AntAvatarProps {
  name?: string;
  pointer?: boolean;
}

export function CustomAvatar(props: CustomAvatarAvatarProps) {
  const { name, pointer = false, style, ...rest } = props;

  const initials = (): string | null => {
    const trimmedName = name && name.trim();

    if (!trimmedName) return null;
    const nameArray = trimmedName.split(' ');

    if (nameArray.length === 1) return nameArray[0].charAt(0).toUpperCase();

    const [firstChar, lastChar] = [nameArray[0].charAt(0), nameArray[1].charAt(0)];

    return (firstChar + lastChar).toUpperCase();
  };

  return (
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
  );
}
