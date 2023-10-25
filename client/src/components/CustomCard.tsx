import type { CardProps } from 'antd';
import { Card } from 'antd';
import type { CSSProperties } from 'react';

interface CustomCardProps extends CardProps {
  hasShadow?: boolean;
  padding?: CSSProperties['padding'];
}
export function CustomCard(props: CustomCardProps) {
  const { hasShadow, children, style, padding, ...rest } = props;

  return (
    <Card
      style={{
        ...style,
        boxShadow: hasShadow ? '0px 2px 12px rgba(39, 49, 60, 0.16)' : 'inherit',
        padding: padding || 'inherit',
      }}
      {...rest}
    >
      {children}
    </Card>
  );
}
