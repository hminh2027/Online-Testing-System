import type { CardProps } from 'antd';
import { Card } from 'antd';

interface CustomCardProps extends CardProps {
  shadow?: boolean;
}
export default function CustomCard(props: CustomCardProps) {
  const { shadow, children, ...rest } = props;

  return (
    <Card
      style={{
        boxShadow: shadow ? '0px 2px 12px rgba(39, 49, 60, 0.16)' : 'inherit',
      }}
      {...rest}
    >
      {children}
    </Card>
  );
}
