import { Space, type SpaceProps } from 'antd';
import type { CSSProperties } from 'react';

interface CustomSpaceProps extends SpaceProps {
  fullWidth?: boolean;
  justify?: CSSProperties['justifyContent'];
}
export default function CustomSpace(props: CustomSpaceProps) {
  const { fullWidth, children, justify, ...rest } = props;

  return (
    <Space
      style={{
        width: fullWidth ? '100%' : 'inherit',
        justifyContent: justify,
      }}
      {...rest}
    >
      {children}
    </Space>
  );
}
