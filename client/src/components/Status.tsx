import type { BadgeProps } from 'antd';
import { Badge } from 'antd';
import { EXAM_STATUS } from '@/constants';
import type { REQUEST_STATUS } from '@/constants';

interface StatusProps {
  status: REQUEST_STATUS | EXAM_STATUS;
}
export function Status({ status }: StatusProps) {
  const getColor = (): BadgeProps['status'] => {
    if (status === EXAM_STATUS.AVAILABLE) return 'success';
    if (status === EXAM_STATUS.NOT_AVAILABLE) return 'error';
    if (status === EXAM_STATUS.OUT_OF_ATTEMPT) return 'error';
    if (status === EXAM_STATUS.ATTEMPTED) return 'warning';

    return 'default';
  };

  return <Badge status={getColor()} text={status} />;
}
