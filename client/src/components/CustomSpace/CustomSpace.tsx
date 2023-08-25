import { Space, type SpaceProps } from 'antd';
import type { CSSProperties } from 'react';

interface CustomSpaceProps extends SpaceProps {
  isFullWidth?: boolean;
  justify?: CSSProperties['justifyContent'];
}
export function CustomSpace(props: CustomSpaceProps) {
  const { isFullWidth, children, justify, ...rest } = props;

  return (
    <Space
      style={{
        width: isFullWidth ? '100%' : 'inherit',
        justifyContent: justify,
      }}
      {...rest}
    >
      {children}
    </Space>
  );
}
