import type { CardProps } from 'antd';
import { Card } from 'antd';

interface CustomCardProps extends CardProps {
  hasShadow?: boolean;
}
export function CustomCard(props: CustomCardProps) {
  const { hasShadow, children, ...rest } = props;

  return (
    <Card
      style={{
        boxShadow: hasShadow
          ? '0px 2px 12px rgba(39, 49, 60, 0.16)'
          : 'inherit',
      }}
      {...rest}
    >
      {children}
    </Card>
  );
}
