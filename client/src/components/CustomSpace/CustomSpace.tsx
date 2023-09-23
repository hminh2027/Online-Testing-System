import { Space, type SpaceProps } from 'antd';
import type { CSSProperties } from 'react';

interface CustomSpaceProps extends SpaceProps {
  isFullWidth?: boolean;
  justify?: CSSProperties['justifyContent'];
  display?: CSSProperties['display'];
}
export function CustomSpace(props: CustomSpaceProps) {
  const { isFullWidth, children, justify, display, style, ...rest } = props;

  return (
    <Space
      {...rest}
      style={{
        width: isFullWidth ? '100%' : 'inherit',
        justifyContent: justify,
        display,
        ...style,
      }}
    >
      {children}
    </Space>
  );
}
