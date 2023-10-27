import type { CardProps } from 'antd';
import { Card } from 'antd';
import type { CSSProperties } from 'react';

interface CustomCardProps extends CardProps {
  hasShadow?: boolean;
  padding?: CSSProperties['padding'];
  radius?: CSSProperties['borderRadius'];
}
export function CustomCard(props: CustomCardProps) {
  const { hasShadow, children, style, padding, radius, ...rest } = props;

  return (
    <Card
      style={{
        ...style,
        boxShadow: hasShadow ? '0px 2px 12px rgba(39, 49, 60, 0.16)' : 'inherit',
        padding: padding || 'inherit',
        borderRadius: radius || 8,
      }}
      {...rest}
    >
      {children}
    </Card>
  );
}
