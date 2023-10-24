import type { BadgeProps } from 'antd';
import { Badge } from 'antd';
import { STATUS } from '@/constants';

interface StatusProps {
  status: STATUS;
}
export function Status({ status }: StatusProps) {
  const getText = (): string => {
    if (status === STATUS.ACTIVE) return 'Hoạt động';
    if (status === STATUS.INACTIVE) return 'Ngừng hoạt động';

    return '';
  };

  const getColor = (): BadgeProps['status'] => {
    if (status === STATUS.ACTIVE) return 'success';
    if (status === STATUS.INACTIVE) return 'error';

    return 'default';
  };

  return <Badge status={getColor()} text={getText()} />;
}
